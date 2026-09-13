import React, { useState, useEffect } from 'react';
import { Mail, Send, Check, MapPin, Compass, MessageSquare, ArrowLeft } from 'lucide-react';
import { setPageSeo } from '../utils/seo';

interface ContactPageProps {
  onNavigateToCollection: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToCollection }) => {
  useEffect(() => {
    setPageSeo(
      "Contact the Atelier & Curatorial Board | Stassen's Collection",
      "Get in touch with our culinary curatorial team for botanical provenance inquiries, harvest questions, or specimen submissions."
    );
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Provenance & Specimen Inquiries',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-[#121212] text-[#F5F5F0] pt-24 pb-20 px-4 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb */}
        <button
          onClick={onNavigateToCollection}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-widest text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </button>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-[#F5F5F0]/10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-medium block mb-2">
            Curator Dispatch & Provenance Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F5F0] tracking-tight leading-tight">
            Contact the Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#F5F5F0]/70 mt-3 font-light leading-relaxed">
            Have questions regarding botanical provenance, harvest windows, or rare cultivar submissions? Reach out to our gastronomic archive curators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Contact Info */}
          <div className="md:col-span-5 space-y-6 text-xs sm:text-sm text-[#F5F5F0]/80">
            <div className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <h3 className="font-serif text-base text-[#F5F5F0] mb-3 text-[#C5A059] flex items-center space-x-2">
                <Compass className="w-4 h-4" />
                <span>Archive Curatorial Board</span>
              </h3>
              <p className="text-[#F5F5F0]/70 leading-relaxed mb-4">
                Stassen's Collection Botanical & Gastronomic Vault<br />
                Global Foraging & Terroir Conservation Network
              </p>

              <div className="space-y-2 text-xs text-[#F5F5F0]/60 pt-3 border-t border-[#F5F5F0]/10">
                <div><strong>Inquiries:</strong> curator@stassencollection.org</div>
                <div><strong>Provenance Hours:</strong> Mon - Fri, 09:00 - 18:00 CET</div>
              </div>
            </div>

            <div className="p-6 bg-[#181818] border border-[#F5F5F0]/10">
              <h3 className="font-serif text-base text-[#F5F5F0] mb-2 text-[#C5A059]">
                Specimen Submissions
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 leading-relaxed">
                If you are a regenerative grower, master forager, or heritage cultivar preserver, submit your botanical dossier and certified terroir testing for archive induction.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="md:col-span-7">
            {isSubmitted ? (
              <div className="p-8 bg-[#181818] border border-[#C5A059]/40 text-center">
                <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto mb-4 border border-[#C5A059]/30">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5F5F0] mb-2">Message Dispatched</h3>
                <p className="text-xs sm:text-sm text-[#F5F5F0]/70 max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you for reaching out. Your provenance inquiry has been logged in our curatorial queue. A member of our gastronomic team will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Provenance & Specimen Inquiries', message: '' });
                  }}
                  className="px-5 py-2 bg-[#252525] hover:bg-[#333] text-xs uppercase tracking-wider text-[#F5F5F0]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-[#181818] border border-[#F5F5F0]/10 space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C5A059] mb-1 font-medium">
                    Your Name or Atelier
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Chef Elena Rostova"
                    className="w-full bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C5A059] mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. elena@atelier.com"
                    className="w-full bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C5A059] mb-1 font-medium">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Provenance & Specimen Inquiries">Provenance & Specimen Inquiries</option>
                    <option value="Harvest Window Consultation">Harvest Window Consultation</option>
                    <option value="New Cultivar Submission">New Cultivar Submission</option>
                    <option value="Recipe Atelier Collaboration">Recipe Atelier Collaboration</option>
                    <option value="General Archival Inquiries">General Archival Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#C5A059] mb-1 font-medium">
                    Message Dossier
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, harvest specifics, or culinary research query..."
                    className="w-full bg-[#222] border border-[#F5F5F0]/15 px-3 py-2 text-xs sm:text-sm text-[#F5F5F0] placeholder-[#F5F5F0]/40 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5A059] text-[#121212] hover:bg-[#d4b066] font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
