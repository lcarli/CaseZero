import React from 'react';

interface NotesModuleProps {
  notes: string;
  onUpdateNotes: (notes: string) => void;
}

export const NotesModule: React.FC<NotesModuleProps> = ({
  notes,
  onUpdateNotes
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
        <h2 className="text-xl font-bold text-green-400 font-mono">INVESTIGATION NOTES</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-green-300 font-mono text-sm">
          CLASSIFICATION: RESTRICTED | CASE SENSITIVE
        </div>

        <textarea
          value={notes}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="Enter your investigation notes here..."
          className="w-full h-96 bg-black/50 border border-green-400/30 rounded p-4 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-green-400/50 placeholder-green-400/30"
        />

        <div className="flex items-center justify-between text-xs font-mono">
          <div className="text-green-400">
            AUTO-SAVE: ENABLED | LAST SAVE: {new Date().toLocaleTimeString()}
          </div>
          <div className="text-green-400">
            CHAR COUNT: {notes.length}
          </div>
        </div>

        <div className="border border-green-400/20 rounded p-3 bg-green-400/5">
          <div className="text-green-400 text-sm mb-1 font-mono">QUICK COMMANDS:</div>
          <div className="text-green-300 text-xs font-mono space-y-1">
            <div>• [EVIDENCE-ID] - Reference evidence</div>
            <div>• [SUSPECT-NAME] - Reference suspect</div>
            <div>• [TIMESTAMP] - Add current timestamp</div>
            <div>• [THEORY] - Mark as theory/hypothesis</div>
          </div>
        </div>
      </div>
    </div>
  );
};
