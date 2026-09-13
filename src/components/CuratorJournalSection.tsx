import React from 'react';
import { BookOpen, ArrowRight, Quote, Compass } from 'lucide-react';

interface JournalEntry {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  location: string;
  date: string;
  readTime: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'dispatch-1',
    tag: 'Field Dispatch No. 12',
    title: 'Hunting Alba’s White Gold in Midnight Piedmontese Fog',
    excerpt: 'The true truffle dog does not bark; she pauses with a trembling paw over damp calcareous marl. In the dark between three and four in the morning, temperature drops unlock volatile sulfur aldehydes.',
    author: 'Matteo Rinaldi',
    location: 'Langhe Hills, Italy',
    date: 'November 2025',
    readTime: '6 min read'
  },
  {
    id: 'dispatch-2',
    tag: 'Secular Alchemy No. 04',
    title: 'The Solera Attic: Century-Old Woods and Aceto Balsamico',
    excerpt: 'Oak provides tannin; chestnut grants deep color; cherry imparts unmistakable fruit sweetness; juniper brings resinous wild pungency. Five centuries of battery barrel aging inside a Modena roof attic.',
    author: 'Elena Pedroni',
    location: 'Modena, Emilia-Romagna',
    date: 'October 2025',
    readTime: '8 min read'
  },
  {
    id: 'dispatch-3',
    tag: 'Botanical Expedition No. 29',
    title: 'Ten Thousand Lilac Stigmas: Autumn Saffron Rites of Kozani',
    excerpt: 'Before the morning dew evaporates, Greek village harvesters bend double over purple fields. It takes seventy-five thousand Crocus sativus blossoms to distill a single pound of pure crimson spice.',
    author: 'Dimitrios Vangelis',
    location: 'Kozani, Western Macedonia',
    date: 'October 2025',
    readTime: '5 min read'
  }
];

export const CuratorJournalSection: React.FC = () => {
  return (
    <section id="journal" className="py-20 sm:py-28 bg-[#0F0F0F] relative border-b border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F5F5F0]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-[#F5F5F0] block mb-2">
              Curator’s Field Dispatches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5F5F0] tracking-tight">
              Essays from the Terroir
            </h2>
          </div>
          <p className="text-xs text-[#F5F5F0]/60 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            First-hand botanical expeditions, multi-generational producer profiles, and the sensory chemistry of rare ingredients.
          </p>
        </div>

        {/* Featured Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOURNAL_ENTRIES.map((entry) => (
            <article
              key={entry.id}
              className="bg-[#161616] p-6 sm:p-8 border border-[#F5F5F0]/10 hover:border-[#C5A059]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                    {entry.tag}
                  </span>
                  <span className="text-[10px] font-mono text-[#F5F5F0]/40">
                    {entry.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug mb-3">
                  {entry.title}
                </h3>

                <p className="text-xs text-[#F5F5F0]/70 font-light leading-relaxed mb-6">
                  {entry.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between text-xs">
                <div>
                  <span className="block font-serif italic text-[#F5F5F0]">{entry.author}</span>
                  <span className="block text-[10px] opacity-40">{entry.location}</span>
                </div>

                <span className="text-[#C5A059] transform group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
