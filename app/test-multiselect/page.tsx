'use client';

import {
  Multiselect,
  MultiselectBadge,
  MultiselectBadgeList,
  MultiselectContent,
  MultiselectEmpty,
  MultiselectInput,
  MultiselectItem,
  MultiselectTrigger,
} from '@/components/ui/multiselect';
import { useState } from 'react';

const frameworks = [
  'astro',
  'express.js',
  'next.js',
  'nuxt.js',
  'preact',
  'remix',
  'sveltekit',
];

const MultiselectWithInput = () => {
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div className="w-full stack gap-1">
      <label htmlFor="with-input" className="font-medium text-sm">
        With input
      </label>
      <Multiselect value={selection} onValueChange={setSelection}>
        <MultiselectTrigger id="with-input" placeholder="Skills">
          <MultiselectBadgeList>
            {selection.map((v) => (
              <MultiselectBadge key={v} value={v}>
                {v}
              </MultiselectBadge>
            ))}
          </MultiselectBadgeList>
        </MultiselectTrigger>
        <MultiselectContent>
          <MultiselectInput placeholder="Search frameworks..." />
          <MultiselectEmpty>No results found.</MultiselectEmpty>
          {frameworks.map((framework) => (
            <MultiselectItem key={framework} value={framework}>
              {framework}
            </MultiselectItem>
          ))}
        </MultiselectContent>
      </Multiselect>
    </div>
  );
};

export default function TestMultiselect() {
  return (
    <div className="min-h-screen flex flex-col py-32 px-4 gap-6 items-center w-full max-w-[24rem] mx-auto">
      <h1 className="w-full font-semibold text-xl">Multiselect Component Test</h1>
      <MultiselectWithInput />
    </div>
  );
} 