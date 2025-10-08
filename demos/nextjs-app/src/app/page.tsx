"use client";

import { ForgeButton, ForgeCard, ForgeInput, ForgeSelect, ForgeSwitch, ForgeBadge, ForgeAlert, ForgeAvatar } from "@nexcraft/forge-react";
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("apple");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="space-y-12">
      {/* Fancy hero */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 p-10 text-white shadow-lg ring-1 ring-black/10">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Forge Demo</h1>
          <p className="mt-3 text-white/90">
            AI‑native web components with tokens, accessibility and performance built‑in.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <ForgeButton variant="primary">Get Started</ForgeButton>
            <ForgeButton variant="secondary">View Docs</ForgeButton>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {["Tokens", "A11y", "Performance"].map((title) => (
          <div key={title} className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-medium text-neutral-900">{title}</h3>
            <p className="mt-2 text-sm text-neutral-600">
              {title === 'Tokens' && 'Forge ships with a design token bridge and CSS variables.'}
              {title === 'A11y' && 'Components follow ARIA patterns and keyboard interactions.'}
              {title === 'Performance' && 'Reactive updates with built‑in performance tracking.'}
            </p>
          </div>
        ))}
      </section>

      {/* Live components */}
      <section id="get-started" className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Inputs</h2>
          <div className="space-y-3">
            <ForgeInput placeholder="Your name" value={name} onChange={(v: unknown) => setName(v as string)} />
            <ForgeSelect
              placeholder="Pick a fruit"
              value={fruit}
              options={[
                { label: 'Apple', value: 'apple' },
                { label: 'Orange', value: 'orange' },
                { label: 'Banana', value: 'banana' },
              ]}
              onChange={(v: unknown) => setFruit(v as string)}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">Feature enabled</span>
              <ForgeSwitch defaultChecked={enabled} onChange={(c) => setEnabled(Boolean(c))} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-medium">Feedback</h2>
          <div className="space-y-3">
            <ForgeAlert severity="success">Success: Operation completed.</ForgeAlert>
            <ForgeAlert severity="warning">Warning: Check your input.</ForgeAlert>
            <ForgeAlert severity="error">Error: Something went wrong.</ForgeAlert>
            <div className="flex items-center gap-3">
              <ForgeBadge>New</ForgeBadge>
              <ForgeBadge variant="success">Stable</ForgeBadge>
              <ForgeBadge variant="warning">Beta</ForgeBadge>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm xl:col-span-1">
          <h2 className="mb-4 text-lg font-medium">Buttons & Avatar</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <ForgeButton variant="primary">Primary</ForgeButton>
              <ForgeButton variant="secondary">Secondary</ForgeButton>
              <ForgeButton variant="ghost">Ghost</ForgeButton>
            </div>
            <div className="flex items-center gap-4">
              <ForgeAvatar initials="JD" status="online" />
              <ForgeAvatar initials="AN" />
              <ForgeAvatar initials="UX" shape="square" />
            </div>
            <p className="text-sm text-neutral-600">Hello {name || 'friend'} — you chose {fruit}.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
