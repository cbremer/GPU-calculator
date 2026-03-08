import React from 'react';
import { ClipboardList, ExternalLink } from 'lucide-react';

const TPMTips: React.FC = () => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <ClipboardList className="h-5 w-5 mr-2 text-cyan-400" />
        TPM Planning Tips
      </h3>
      <ul className="space-y-2 text-sm text-slate-300">
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
          Start from customer-facing KPIs (latency, throughput, and monthly budget), then map to hardware options.
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
          Use Compare view to align Engineering, Finance, and Procurement on one shortlist before running pilots.
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
          Re-check regions and model availability with your cloud account team before execution.
        </li>
      </ul>
      <a
        href="https://github.com/cbremer/how-to-use-github"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center mt-4 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        GitHub basics training resource
        <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
};

export default TPMTips;
