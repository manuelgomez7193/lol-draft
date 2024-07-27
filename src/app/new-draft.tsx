"use client";

import Link from 'next/link';
import { useState } from 'react';
// import LinkGenerator from '../hooks/link-generation';

function NewDraft() {
  const [blueTeamName, setBlueTeamName] = useState('');
  const [redTeamName, setRedTeamName] = useState('');

    return (
      <div className="flex flex-col items-center justify-center h-dvh gap-6">
        <div className="mb-2">
            <h2 className="text-blue mb-2">BLUE TEAM</h2>
            <input
              type="text"
              value={blueTeamName}
              className="input-custom"
              onChange={(e) => setBlueTeamName(e.target.value)}
              placeholder='Blue Team Name'
              autoFocus={true}
            />
        </div>
        <div className="mb-2" >
            <h2 className="text-red mb-2">RED TEAM</h2>
            <input 
              type="text" 
              className="input-custom"
              value={redTeamName}
              onChange={(e) => setRedTeamName(e.target.value)}
              placeholder='Red Team Name'
            />
        </div>
        <Link href={`/drafts?blueTeam=${encodeURIComponent(blueTeamName)}&redTeam=${encodeURIComponent(redTeamName)}`}>
          <button className="mt-2 button-custom">
              Create room draft
          </button>
        </Link>
        {/* <LinkGenerator /> */}
      </div>
    );
  }
  
  export default NewDraft;