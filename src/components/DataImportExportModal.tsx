import React, { useState, useEffect } from 'react';
import { Ingredient } from '../types';
import {
  X,
  Download,
  Upload,
  RefreshCw,
  Check,
  AlertCircle,
  Copy,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Database,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCode,
  Sliders,
  Play,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentSystem } from '../content/contentSystem';
import { UnifiedBatchImportResult, ContentIntegrityReport } from '../content/schema';
import { ingredientService } from '../services/ingredientService';
import { recipeService } from '../services/recipeService';

interface DataImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIngredients: Ingredient[];
  onImportIngredients: (newIngredients: Ingredient[]) => void;
  onResetDefault: () => void;
}

type TabType = 'import' | 'export' | 'templates' | 'integrity';
type IngestionTarget = 'auto' | 'ingredients' | 'recipes' | 'combined';

export const DataImportExportModal: React.FC<DataImportExportModalProps> = ({
  isOpen,
  onClose,
  currentIngredients,
  onImportIngredients,
  onResetDefault
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('import');
  const [ingestionTarget, setIngestionTarget] = useState<IngestionTarget>('auto');
  const [allowUpdates, setAllowUpdates] = useState(false);
  const [resolveCollisions, setResolveCollisions] = useState(true);
  const [isDryRun, setIsDryRun] = useState(false);

  // Input states
  const [inputMode, setInputMode] = useState<'upload' | 'paste'>('paste');
  const [rawText, setRawText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Processing & Results
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<UnifiedBatchImportResult | null>(null);
  const [resultFilter, setResultFilter] = useState<'all' | 'accepted' | 'rejected' | 'warnings'>('all');

  // Integrity Audit state
  const [integrityReport, setIntegrityReport] = useState<ContentIntegrityReport | null>(null);

  // Status alerts & copy feedbacks
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset local state when opened
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
      setConfirmReset(false);
    }
  }, [isOpen]);

  const executeImport = (inputData: unknown) => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Yield to let UI update spinner
    setTimeout(() => {
      try {
        const result = ContentSystem.importDataset(inputData, {
          targetType: ingestionTarget,
          allowUpdates,
          resolveSlugCollisions: resolveCollisions,
          dryRun: isDryRun
        });

        setLastResult(result);

        if (!isDryRun && result.totalImported > 0) {
          onImportIngredients(ingredientService.getAllIngredients());
        }

        if (result.totalFailed > 0 && result.totalImported === 0) {
          setErrorMessage(`Batch rejected: ${result.totalFailed} record(s) failed validation checks. View exact errors below.`);
        }
      } catch (err: any) {
        setErrorMessage(`Execution error during ingestion: ${err?.message || 'Unknown error'}`);
      } finally {
        setIsProcessing(false);
      }
    }, 50);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawText(content);
      executeImport(content);
    };
    reader.onerror = () => {
      setErrorMessage('Could not read the uploaded file.');
    };
    reader.readAsText(file);
  };

  const handlePasteSubmit = () => {
    if (!rawText.trim()) {
      setErrorMessage('Please paste structured JSON or CSV data first.');
      return;
    }
    executeImport(rawText);
  };

  const handleRunIntegrity = () => {
    const report = ContentSystem.verifyIntegrity();
    setIntegrityReport(report);
  };

  const triggerDownload = (filename: string, content: string, mimeType: string = 'text/plain') => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportFullJson = () => {
    const data = ContentSystem.exportAll();
    triggerDownload(`stassens-archive-complete-${data.metadata.exportedAt.slice(0, 10)}.json`, JSON.stringify(data, null, 2), 'application/json');
  };

  const handleExportIngredientsJson = () => {
    const ingredients = ingredientService.getAllIngredients();
    triggerDownload(`stassens-ingredients-dataset-${ingredients.length}-entries.json`, JSON.stringify(ingredients, null, 2), 'application/json');
  };

  const handleExportRecipesJson = () => {
    const recipes = recipeService.getAllRecipes();
    triggerDownload(`stassens-recipes-dataset-${recipes.length}-entries.json`, JSON.stringify(recipes, null, 2), 'application/json');
  };

  const handleExportIngredientsCsv = () => {
    const csv = ContentSystem.exportIngredientsCsv();
    triggerDownload('stassens-ingredients-export.csv', csv, 'text/csv');
  };

  const handleExportRecipesCsv = () => {
    const csv = ContentSystem.exportRecipesCsv();
    triggerDownload('stassens-recipes-export.csv', csv, 'text/csv');
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  const totalRecipesCount = recipeService.getAllRecipes().length;
  const totalIngredientsCount = ingredientService.getAllIngredients().length;

  const filteredRecords = lastResult?.records.filter((rec) => {
    if (resultFilter === 'accepted') return rec.status === 'imported' || rec.status === 'updated' || rec.status === 'dry_run';
    if (resultFilter === 'rejected') return rec.status === 'rejected';
    if (resultFilter === 'warnings') return rec.warnings.length > 0;
    return true;
  }) || [];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#121212] border border-[#F5F5F0]/15 p-5 sm:p-7 max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F0]/10 mb-4">
          <div className="flex items-center space-x-3">
            <button
              id="bulk-import-modal-back-btn"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#202020] hover:bg-[#2a2a2a] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] transition-all text-xs font-mono group"
              title="Return to Archive (Esc)"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#C5A059]" />
              <span className="font-medium">Back</span>
            </button>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Production Content-Data Engine
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                Safe Bulk Ingestion & Scale Hub
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F5F5F0]/60 hover:text-white rounded hover:bg-white/5"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Catalog Baseline Stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-[#171717] border border-[#F5F5F0]/10 px-4 py-2.5 mb-5">
          <div className="flex items-center space-x-4">
            <span className="text-[#F5F5F0]/60">Active Archive:</span>
            <span className="text-[#F5F5F0] font-mono font-medium">
              <strong className="text-[#C5A059]">{totalIngredientsCount}</strong> Ingredients
            </span>
            <span className="text-[#F5F5F0]/30">•</span>
            <span className="text-[#F5F5F0] font-mono font-medium">
              <strong className="text-[#C5A059]">{totalRecipesCount}</strong> Masterclass Recipes
            </span>
          </div>
          <span className="text-[11px] text-[#F5F5F0]/50 font-mono">
            RFC 4180 CSV & Structured JSON Ready
          </span>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex border-b border-[#F5F5F0]/10 mb-6 overflow-x-auto">
          <button
            id="tab-import-btn"
            onClick={() => setActiveTab('import')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-mono border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'import'
                ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Bulk Ingestion</span>
          </button>

          <button
            id="tab-export-btn"
            onClick={() => setActiveTab('export')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-mono border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'export'
                ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Catalog</span>
          </button>

          <button
            id="tab-templates-btn"
            onClick={() => setActiveTab('templates')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-mono border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'templates'
                ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Starter Schemas & CSVs</span>
          </button>

          <button
            id="tab-integrity-btn"
            onClick={() => {
              setActiveTab('integrity');
              if (!integrityReport) handleRunIntegrity();
            }}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs uppercase tracking-wider font-mono border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'integrity'
                ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/5'
                : 'border-transparent text-[#F5F5F0]/60 hover:text-[#F5F5F0]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Catalog Integrity Audit</span>
          </button>
        </div>

        {/* Global Error Notice */}
        {errorMessage && (
          <div className="p-3 bg-[#331414] border border-[#e05a5a]/50 text-[#ffb5b5] text-xs font-mono mb-5 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#ff7575] mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {/* TAB 1: BULK INGESTION */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            {/* Safety & Ingestion Configurations */}
            <div className="bg-[#181818] border border-[#F5F5F0]/10 p-4 space-y-4">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#C5A059] font-mono">
                <Sliders className="w-3.5 h-3.5" />
                <span>Ingestion Parameters & Integrity Safeguards</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Entity Target Selector */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#F5F5F0]/60 mb-1.5">
                    Target Entity Classification
                  </label>
                  <select
                    value={ingestionTarget}
                    onChange={(e) => setIngestionTarget(e.target.value as IngestionTarget)}
                    className="w-full bg-[#101010] border border-[#F5F5F0]/20 text-[#F5F5F0] p-2.5 text-xs font-mono focus:border-[#C5A059] outline-none"
                  >
                    <option value="auto">Auto-Detect (Ingredients & Recipes Mixed)</option>
                    <option value="ingredients">Ingredients Only (Specimens Catalog)</option>
                    <option value="recipes">Culinary Masterclasses Only (Recipes)</option>
                    <option value="combined">Combined Catalog Object</option>
                  </select>
                </div>

                {/* Safety Toggles */}
                <div className="space-y-2.5">
                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowUpdates}
                      onChange={(e) => setAllowUpdates(e.target.checked)}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <span className="text-[#F5F5F0]/80">
                      <strong>Allow updates:</strong> Overwrite existing records if ID matches (Default: Off to prevent accidental overwrite)
                    </span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={resolveCollisions}
                      onChange={(e) => setResolveCollisions(e.target.checked)}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <span className="text-[#F5F5F0]/80">
                      <strong>Auto-resolve slug conflicts:</strong> Automatically append numerical suffixes (-2) to duplicate URLs
                    </span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isDryRun}
                      onChange={(e) => setIsDryRun(e.target.checked)}
                      className="mt-0.5 accent-[#C5A059]"
                    />
                    <span className="text-[#C5A059]">
                      <strong>Dry Run mode:</strong> Validate syntax and report collisions without writing to database
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Input Selection: Upload vs Paste */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-[#161616] p-1 border border-[#F5F5F0]/10">
                  <button
                    onClick={() => setInputMode('paste')}
                    className={`px-3 py-1 text-xs font-mono transition-colors ${
                      inputMode === 'paste' ? 'bg-[#C5A059] text-black font-semibold' : 'text-[#F5F5F0]/60 hover:text-white'
                    }`}
                  >
                    Paste Text (JSON or CSV)
                  </button>
                  <button
                    onClick={() => setInputMode('upload')}
                    className={`px-3 py-1 text-xs font-mono transition-colors ${
                      inputMode === 'upload' ? 'bg-[#C5A059] text-black font-semibold' : 'text-[#F5F5F0]/60 hover:text-white'
                    }`}
                  >
                    Upload File (.json / .csv)
                  </button>
                </div>

                <button
                  onClick={() => {
                    const sample = ContentSystem.generateSampleCsvs().ingredientCsv;
                    setRawText(sample);
                    setInputMode('paste');
                  }}
                  className="text-[11px] text-[#C5A059] hover:underline font-mono"
                >
                  Load Sample CSV Into Editor
                </button>
              </div>

              {inputMode === 'upload' ? (
                <div className="border-2 border-dashed border-[#F5F5F0]/20 hover:border-[#C5A059]/60 p-8 text-center transition-colors bg-[#141414]">
                  <Upload className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-80" />
                  <p className="text-xs text-[#F5F5F0] font-medium mb-1">
                    Select a .JSON or .CSV file containing 1 to 1,000+ entries
                  </p>
                  <p className="text-[11px] text-[#F5F5F0]/50 mb-4 font-mono">
                    All records will be checked for duplicate IDs, required keys, and reference integrity.
                  </p>
                  <label className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C5A059] text-[#121212] font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#d6b168]">
                    <span>Browse Local File</span>
                    <input
                      type="file"
                      accept=".json,.csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {uploadedFileName && (
                    <p className="mt-3 text-xs text-[#a2f0b2] font-mono">
                      Loaded file: {uploadedFileName}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder='Paste JSON array: [ { "id": "truffle-alba", "name": "Alba White Truffle", ... } ] &#10;OR paste CSV text with headers: id,name,category,origin,description...'
                    className="w-full h-44 p-3 bg-[#0c0c0c] border border-[#F5F5F0]/15 text-[#F5F5F0] text-xs font-mono focus:border-[#C5A059] outline-none resize-y"
                  />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#F5F5F0]/40 font-mono">
                      {rawText.length > 0 ? `${rawText.length.toLocaleString()} characters loaded` : 'Ready for batch payload'}
                    </span>
                    <button
                      onClick={handlePasteSubmit}
                      disabled={isProcessing || !rawText.trim()}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-[#C5A059] disabled:bg-[#252525] disabled:text-[#666] text-[#121212] font-semibold text-xs uppercase tracking-[0.15em] transition-colors"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Validating...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isDryRun ? 'Simulate & Validate' : 'Validate & Ingest Batch'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ingestion Results & Record-by-Record Audit Panel */}
            {lastResult && (
              <div className="border border-[#F5F5F0]/15 bg-[#141414] p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F5F5F0]/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs uppercase tracking-wider font-mono text-[#F5F5F0]">
                      Batch Execution Audit
                    </span>
                    {lastResult.isDryRun && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-[10px] font-mono uppercase tracking-wider border border-blue-500/40">
                        Dry Run (No writes)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#F5F5F0]/50">
                    Duration: {lastResult.durationMs}ms
                  </span>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
                  <div className="bg-[#1b1b1b] border border-[#F5F5F0]/10 p-3">
                    <span className="block text-[10px] uppercase tracking-wider text-[#F5F5F0]/50">Total Submitted</span>
                    <span className="font-mono text-lg text-[#F5F5F0] font-bold">{lastResult.totalSubmitted}</span>
                  </div>
                  <div className="bg-[#132716] border border-[#60c075]/30 p-3">
                    <span className="block text-[10px] uppercase tracking-wider text-[#a2f0b2]">Accepted / Ingested</span>
                    <span className="font-mono text-lg text-[#a2f0b2] font-bold">
                      {lastResult.totalImported}
                    </span>
                    <span className="block text-[9px] text-[#a2f0b2]/70 font-mono">
                      ({lastResult.totalIngredientsImported} ing, {lastResult.totalRecipesImported} rec)
                    </span>
                  </div>
                  <div className="bg-[#2e1515] border border-[#e05a5a]/30 p-3">
                    <span className="block text-[10px] uppercase tracking-wider text-[#ffb5b5]">Rejected / Quarantined</span>
                    <span className="font-mono text-lg text-[#ffb5b5] font-bold">{lastResult.totalFailed}</span>
                  </div>
                  <div className="bg-[#2a2215] border border-[#d4a34b]/30 p-3">
                    <span className="block text-[10px] uppercase tracking-wider text-[#ffd98a]">Notices / Normalizations</span>
                    <span className="font-mono text-lg text-[#ffd98a] font-bold">{lastResult.allWarnings.length}</span>
                  </div>
                  {typeof lastResult.averageQualityScore === 'number' && (
                    <div className="bg-[#12231c] border border-emerald-500/30 p-3">
                      <span className="block text-[10px] uppercase tracking-wider text-emerald-300">Avg Quality Score</span>
                      <span className="font-mono text-lg text-emerald-200 font-bold">{lastResult.averageQualityScore}/100</span>
                    </div>
                  )}
                  {typeof lastResult.averageSeoScore === 'number' && (
                    <div className="bg-[#131f2b] border border-blue-500/30 p-3">
                      <span className="block text-[10px] uppercase tracking-wider text-blue-300">Avg SEO Health</span>
                      <span className="font-mono text-lg text-blue-200 font-bold">{lastResult.averageSeoScore}/100</span>
                    </div>
                  )}
                </div>

                {/* Record Filter Tabs */}
                <div className="flex items-center space-x-2 pt-2 text-xs font-mono">
                  <button
                    onClick={() => setResultFilter('all')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      resultFilter === 'all' ? 'bg-[#333] text-white' : 'text-[#F5F5F0]/60 hover:text-white'
                    }`}
                  >
                    All Items ({lastResult.records.length})
                  </button>
                  <button
                    onClick={() => setResultFilter('accepted')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      resultFilter === 'accepted' ? 'bg-[#1e3a24] text-[#a2f0b2]' : 'text-[#a2f0b2]/60 hover:text-[#a2f0b2]'
                    }`}
                  >
                    Valid ({lastResult.totalImported})
                  </button>
                  <button
                    onClick={() => setResultFilter('rejected')}
                    className={`px-2.5 py-1 rounded text-[11px] ${
                      resultFilter === 'rejected' ? 'bg-[#401a1a] text-[#ffb5b5]' : 'text-[#ffb5b5]/60 hover:text-[#ffb5b5]'
                    }`}
                  >
                    Rejected ({lastResult.totalFailed})
                  </button>
                  {lastResult.allWarnings.length > 0 && (
                    <button
                      onClick={() => setResultFilter('warnings')}
                      className={`px-2.5 py-1 rounded text-[11px] ${
                        resultFilter === 'warnings' ? 'bg-[#3b2e16] text-[#ffd98a]' : 'text-[#ffd98a]/60 hover:text-[#ffd98a]'
                      }`}
                    >
                      Warnings ({lastResult.records.filter(r => r.warnings.length > 0).length})
                    </button>
                  )}
                </div>

                {/* Record Breakdown List */}
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {filteredRecords.length === 0 ? (
                    <div className="text-center py-6 text-xs text-[#F5F5F0]/40 font-mono">
                      No records match the current filter.
                    </div>
                  ) : (
                    filteredRecords.map((rec, i) => (
                      <div
                        key={i}
                        className={`p-2.5 border text-xs font-mono transition-colors ${
                          rec.status === 'rejected'
                            ? 'bg-[#261313] border-[#e05a5a]/40 text-[#ffb5b5]'
                            : rec.status === 'dry_run'
                            ? 'bg-[#131c26] border-blue-500/30 text-blue-200'
                            : 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 uppercase tracking-wider">
                              #{rec.index} {rec.type}
                            </span>
                            <span className="font-semibold text-[#F5F5F0]">{rec.name}</span>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                              rec.status === 'rejected'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                : rec.status === 'dry_run'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : rec.status === 'updated'
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {rec.status}
                          </span>
                        </div>

                        {rec.id && (
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#F5F5F0]/60 mb-1">
                            <span>ID: <strong className="text-[#C5A059] font-normal">{rec.id}</strong></span>
                            {rec.slug && (
                              <span>Slug: <strong className="text-[#C5A059] font-normal">{rec.slug}</strong></span>
                            )}
                            {typeof rec.qualityScore === 'number' && (
                              <span className={`px-1.5 py-0.2 rounded text-[10px] border ${
                                rec.qualityScore >= 80
                                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                                  : rec.qualityScore >= 50
                                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                                  : 'bg-red-950/60 border-red-500/40 text-red-300'
                              }`}>
                                Quality: {rec.qualityScore}/100
                              </span>
                            )}
                            {typeof rec.seoScore === 'number' && (
                              <span className={`px-1.5 py-0.2 rounded text-[10px] border ${
                                rec.seoScore >= 80
                                  ? 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                                  : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                              }`}>
                                SEO: {rec.seoScore}/100
                              </span>
                            )}
                          </div>
                        )}

                        {/* Near Duplicate Match Detection */}
                        {rec.nearDuplicateMatch && (
                          <div className="mt-1 p-1.5 bg-amber-950/30 border border-amber-600/40 text-[11px] text-amber-200 flex items-start space-x-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                            <span>
                              Near-duplicate content: matches <strong>{rec.nearDuplicateMatch.matchedTitle}</strong> ({rec.nearDuplicateMatch.matchedId}) with {Math.round(rec.nearDuplicateMatch.similarity * 100)}% substantive text overlap.
                            </span>
                          </div>
                        )}

                        {/* Error Breakdown */}
                        {rec.errors.length > 0 && (
                          <div className="mt-1.5 space-y-0.5 text-[11px] text-[#ff8080]">
                            {rec.errors.map((err, errIdx) => (
                              <div key={errIdx} className="flex items-start space-x-1.5">
                                <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400" />
                                <span>{err}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Warnings Breakdown */}
                        {rec.warnings.length > 0 && (
                          <div className="mt-1.5 space-y-0.5 text-[11px] text-[#ffd98a]">
                            {rec.warnings.map((warn, warnIdx) => (
                              <div key={warnIdx} className="flex items-start space-x-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                                <span>{warn}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPORT CATALOG */}
        {activeTab === 'export' && (
          <div className="space-y-5">
            <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed">
              Export the current archive in clean, standardized formats. Exported files include stable IDs, slug routing, fallback image URLs, and bi-directional cross-indexing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Complete JSON Catalog */}
              <button
                onClick={handleExportFullJson}
                className="flex items-start space-x-3 p-4 bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059] text-left transition-colors group"
              >
                <Database className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#F5F5F0] group-hover:text-[#C5A059]">
                    Export Master Archive (.JSON)
                  </span>
                  <span className="block text-[11px] text-[#F5F5F0]/50 mt-1">
                    Combined export of all {totalIngredientsCount} ingredients and {totalRecipesCount} recipes with export metadata.
                  </span>
                </div>
              </button>

              {/* Ingredients CSV */}
              <button
                onClick={handleExportIngredientsCsv}
                className="flex items-start space-x-3 p-4 bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059] text-left transition-colors group"
              >
                <FileText className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#F5F5F0] group-hover:text-[#C5A059]">
                    Export Ingredients (.CSV)
                  </span>
                  <span className="block text-[11px] text-[#F5F5F0]/50 mt-1">
                    RFC 4180 standard CSV of all {totalIngredientsCount} specimens. Compatible with Excel, Google Sheets, and databases.
                  </span>
                </div>
              </button>

              {/* Recipes CSV */}
              <button
                onClick={handleExportRecipesCsv}
                className="flex items-start space-x-3 p-4 bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059] text-left transition-colors group"
              >
                <FileText className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#F5F5F0] group-hover:text-[#C5A059]">
                    Export Recipes (.CSV)
                  </span>
                  <span className="block text-[11px] text-[#F5F5F0]/50 mt-1">
                    RFC 4180 standard CSV of all {totalRecipesCount} culinary masterclass recipes.
                  </span>
                </div>
              </button>

              {/* Ingredients JSON */}
              <button
                onClick={handleExportIngredientsJson}
                className="flex items-start space-x-3 p-4 bg-[#161616] border border-[#F5F5F0]/10 hover:border-[#C5A059] text-left transition-colors group"
              >
                <FileCode className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-semibold text-[#F5F5F0] group-hover:text-[#C5A059]">
                    Export Ingredients (.JSON)
                  </span>
                  <span className="block text-[11px] text-[#F5F5F0]/50 mt-1">
                    Clean array of ingredient objects with taste profiles, terroir, and SEO metadata.
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: STARTER TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed">
              Use these verified starter templates to prepare your batches. All fields conform strictly to the content-data schema.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ingredient Template */}
              <div className="bg-[#171717] border border-[#F5F5F0]/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C5A059] font-mono font-semibold">
                    Ingredient Template
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(JSON.stringify([ContentSystem.generateSampleSchemas().ingredient], null, 2), 'ing-json')}
                      className="text-[10px] font-mono text-[#C5A059] hover:underline"
                    >
                      {copiedKey === 'ing-json' ? 'Copied JSON!' : 'Copy JSON'}
                    </button>
                    <span className="text-[#F5F5F0]/20">|</span>
                    <button
                      onClick={() => handleCopy(ContentSystem.generateSampleCsvs().ingredientCsv, 'ing-csv')}
                      className="text-[10px] font-mono text-[#C5A059] hover:underline"
                    >
                      {copiedKey === 'ing-csv' ? 'Copied CSV!' : 'Copy CSV'}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-[#F5F5F0]/60">
                  Required keys: <code className="text-[#C5A059]">id</code>, <code className="text-[#C5A059]">name</code>, <code className="text-[#C5A059]">category</code>, <code className="text-[#C5A059]">origin</code>, <code className="text-[#C5A059]">description</code>.
                </p>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => triggerDownload('starter-ingredient-template.csv', ContentSystem.generateSampleCsvs().ingredientCsv, 'text/csv')}
                    className="flex-1 py-2 bg-[#222] hover:bg-[#282828] text-[#F5F5F0] text-xs font-mono border border-[#F5F5F0]/10"
                  >
                    Download .CSV Starter
                  </button>
                  <button
                    onClick={() => triggerDownload('starter-ingredient-template.json', JSON.stringify([ContentSystem.generateSampleSchemas().ingredient], null, 2), 'application/json')}
                    className="flex-1 py-2 bg-[#222] hover:bg-[#282828] text-[#F5F5F0] text-xs font-mono border border-[#F5F5F0]/10"
                  >
                    Download .JSON Starter
                  </button>
                </div>
              </div>

              {/* Recipe Template */}
              <div className="bg-[#171717] border border-[#F5F5F0]/10 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#C5A059] font-mono font-semibold">
                    Recipe Template
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCopy(JSON.stringify([ContentSystem.generateSampleSchemas().recipe], null, 2), 'rec-json')}
                      className="text-[10px] font-mono text-[#C5A059] hover:underline"
                    >
                      {copiedKey === 'rec-json' ? 'Copied JSON!' : 'Copy JSON'}
                    </button>
                    <span className="text-[#F5F5F0]/20">|</span>
                    <button
                      onClick={() => handleCopy(ContentSystem.generateSampleCsvs().recipeCsv, 'rec-csv')}
                      className="text-[10px] font-mono text-[#C5A059] hover:underline"
                    >
                      {copiedKey === 'rec-csv' ? 'Copied CSV!' : 'Copy CSV'}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-[#F5F5F0]/60">
                  Required keys: <code className="text-[#C5A059]">id</code>, <code className="text-[#C5A059]">dishTitle</code>, <code className="text-[#C5A059]">cuisine</code>, <code className="text-[#C5A059]">courseCategory</code>, <code className="text-[#C5A059]">timelineSteps</code>.
                </p>

                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => triggerDownload('starter-recipe-template.csv', ContentSystem.generateSampleCsvs().recipeCsv, 'text/csv')}
                    className="flex-1 py-2 bg-[#222] hover:bg-[#282828] text-[#F5F5F0] text-xs font-mono border border-[#F5F5F0]/10"
                  >
                    Download .CSV Starter
                  </button>
                  <button
                    onClick={() => triggerDownload('starter-recipe-template.json', JSON.stringify([ContentSystem.generateSampleSchemas().recipe], null, 2), 'application/json')}
                    className="flex-1 py-2 bg-[#222] hover:bg-[#282828] text-[#F5F5F0] text-xs font-mono border border-[#F5F5F0]/10"
                  >
                    Download .JSON Starter
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CATALOG INTEGRITY AUDIT */}
        {activeTab === 'integrity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#F5F5F0]/70 font-light">
                Scans all ingredients and recipes for ID collisions, duplicate slugs, broken links, and missing assets.
              </p>
              <button
                onClick={handleRunIntegrity}
                className="px-3 py-1.5 bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider font-mono hover:bg-[#d6b168]"
              >
                Re-Run Audit
              </button>
            </div>

            {integrityReport && (
              <div className="space-y-4">
                {/* Health Score Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#181818] border border-[#F5F5F0]/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#F5F5F0]/50 block font-mono">
                      Database Health Score
                    </span>
                    <span className="font-serif text-3xl text-[#C5A059]">
                      {integrityReport.overallHealthScore} / 100
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 block font-mono">
                      Content Quality Index
                    </span>
                    <span className="font-serif text-3xl text-emerald-400">
                      {integrityReport.contentQualityScore ?? 100} / 100
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-blue-400/80 block font-mono">
                      SEO & Meta Health
                    </span>
                    <span className="font-serif text-3xl text-blue-400">
                      {integrityReport.seoHealthScore ?? 100} / 100
                    </span>
                  </div>
                </div>

                {/* Issues Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs font-mono">
                  <div className={`p-3 border ${integrityReport.duplicateIngredientIds.length === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331414] border-red-500/40 text-red-300'}`}>
                    <span className="block font-semibold">Duplicate Ingredient IDs</span>
                    <span className="text-lg font-bold">{integrityReport.duplicateIngredientIds.length}</span>
                  </div>

                  <div className={`p-3 border ${integrityReport.duplicateIngredientSlugs.length === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331414] border-red-500/40 text-red-300'}`}>
                    <span className="block font-semibold">Duplicate Ingredient Slugs</span>
                    <span className="text-lg font-bold">{integrityReport.duplicateIngredientSlugs.length}</span>
                  </div>

                  <div className={`p-3 border ${integrityReport.duplicateRecipeIds.length === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331414] border-red-500/40 text-red-300'}`}>
                    <span className="block font-semibold">Duplicate Recipe IDs</span>
                    <span className="text-lg font-bold">{integrityReport.duplicateRecipeIds.length}</span>
                  </div>

                  <div className={`p-3 border ${integrityReport.duplicateRecipeSlugs.length === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331414] border-red-500/40 text-red-300'}`}>
                    <span className="block font-semibold">Duplicate Recipe Slugs</span>
                    <span className="text-lg font-bold">{integrityReport.duplicateRecipeSlugs.length}</span>
                  </div>

                  <div className={`p-3 border ${(integrityReport.thinOrShortDescriptions?.ingredients.length ?? 0) === 0 && (integrityReport.thinOrShortDescriptions?.recipes.length ?? 0) === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331e14] border-amber-500/40 text-amber-300'}`}>
                    <span className="block font-semibold">Thin Descriptions</span>
                    <span className="text-lg font-bold">{(integrityReport.thinOrShortDescriptions?.ingredients.length ?? 0) + (integrityReport.thinOrShortDescriptions?.recipes.length ?? 0)}</span>
                  </div>

                  <div className={`p-3 border ${(integrityReport.nearDuplicateContent?.length ?? 0) === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331e14] border-amber-500/40 text-amber-300'}`}>
                    <span className="block font-semibold">Near-Duplicate Matches</span>
                    <span className="text-lg font-bold">{integrityReport.nearDuplicateContent?.length ?? 0}</span>
                  </div>

                  <div className={`p-3 border ${(integrityReport.keywordStuffingIssues?.length ?? 0) === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331e14] border-amber-500/40 text-amber-300'}`}>
                    <span className="block font-semibold">Keyword Stuffing Alerts</span>
                    <span className="text-lg font-bold">{integrityReport.keywordStuffingIssues?.length ?? 0}</span>
                  </div>

                  <div className={`p-3 border ${(integrityReport.missingSeoInformation?.ingredients.length ?? 0) === 0 && (integrityReport.missingSeoInformation?.recipes.length ?? 0) === 0 ? 'bg-[#152417] border-[#60c075]/30 text-[#a2f0b2]' : 'bg-[#331e14] border-amber-500/40 text-amber-300'}`}>
                    <span className="block font-semibold">Missing SEO Info</span>
                    <span className="text-lg font-bold">{(integrityReport.missingSeoInformation?.ingredients.length ?? 0) + (integrityReport.missingSeoInformation?.recipes.length ?? 0)}</span>
                  </div>
                </div>

                {/* Detailed Findings */}
                {integrityReport.nearDuplicateContent && integrityReport.nearDuplicateContent.length > 0 && (
                  <div className="p-3 bg-[#2b2216] border border-amber-500/30 text-xs font-mono text-amber-200">
                    <span className="font-semibold block mb-1">Near-Duplicate Content Detected:</span>
                    {integrityReport.nearDuplicateContent.map((item, idx) => (
                      <div key={idx}>
                        • {item.type} <strong className="text-[#C5A059]">{item.id}</strong> is highly similar to <strong className="text-[#C5A059]">{item.matchingId}</strong> ({Math.round(item.similarity * 100)}% match)
                      </div>
                    ))}
                  </div>
                )}

                {integrityReport.keywordStuffingIssues && integrityReport.keywordStuffingIssues.length > 0 && (
                  <div className="p-3 bg-[#2b2216] border border-amber-500/30 text-xs font-mono text-amber-200">
                    <span className="font-semibold block mb-1">Keyword Stuffing Anomalies:</span>
                    {integrityReport.keywordStuffingIssues.map((item, idx) => (
                      <div key={idx}>
                        • {item.type} <strong className="text-[#C5A059]">{item.id}</strong>: "{item.word}" has excessive density ({item.densityPercent}%)
                      </div>
                    ))}
                  </div>
                )}

                {integrityReport.invalidTimingOrServings && integrityReport.invalidTimingOrServings.length > 0 && (
                  <div className="p-3 bg-[#2b1616] border border-red-500/30 text-xs font-mono text-red-200">
                    <span className="font-semibold block mb-1">Invalid Recipe Timings or Servings:</span>
                    {integrityReport.invalidTimingOrServings.map((item, idx) => (
                      <div key={idx}>
                        • Recipe <strong className="text-[#C5A059]">{item.recipeId}</strong>: {item.issue}
                      </div>
                    ))}
                  </div>
                )}

                {integrityReport.brokenIngredientReferences && integrityReport.brokenIngredientReferences.length > 0 && (
                  <div className="p-3 bg-[#2b1616] border border-red-500/30 text-xs font-mono text-red-200">
                    <span className="font-semibold block mb-1">Broken Ingredient References in Recipes:</span>
                    {integrityReport.brokenIngredientReferences.map((item, idx) => (
                      <div key={idx}>
                        • Recipe <strong className="text-[#C5A059]">{item.recipeId}</strong> references unknown ingredient: {item.ingredientRef}
                      </div>
                    ))}
                  </div>
                )}

                {/* Broken Links Summary */}
                {integrityReport.unresolvedIngredientRecipeLinks.length > 0 && (
                  <div className="p-3 bg-[#2b1616] border border-red-500/30 text-xs font-mono text-red-200">
                    <span className="font-semibold block mb-1">Unresolved Recipe Links:</span>
                    {integrityReport.unresolvedIngredientRecipeLinks.map((item, idx) => (
                      <div key={idx}>
                        • Ingredient <strong className="text-[#C5A059]">{item.ingredientId}</strong> references missing recipe <strong className="text-[#C5A059]">{item.missingRecipeId}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer Controls: Reset & Close */}
        <div className="mt-8 pt-4 border-t border-[#F5F5F0]/10 flex flex-wrap items-center justify-between gap-3">
          {confirmReset ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-red-400 font-mono">Confirm revert to master baseline?</span>
              <button
                onClick={() => {
                  onResetDefault();
                  setConfirmReset(false);
                  setLastResult(null);
                }}
                className="px-3 py-1 bg-red-600 text-white text-xs uppercase tracking-wider font-mono font-bold hover:bg-red-700"
              >
                Yes, Reset All
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="px-3 py-1 bg-[#252525] text-white text-xs uppercase tracking-wider font-mono"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="flex items-center space-x-1.5 text-xs text-[#F5F5F0]/50 hover:text-red-400 font-mono transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Catalog to Curated Defaults</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#202020] hover:bg-[#2c2c2c] text-[#F5F5F0] text-xs uppercase tracking-wider font-mono transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
