"use client";

import { useEffect, useState } from "react";
import type { ClientLogo } from "@/lib/schemas/site";

const inputStyle = { width: "100%", padding: ".75rem 1rem", border: "1px solid #e5e7eb", borderRadius: "16px", marginTop: ".4rem" };

export default function BrandLogosEditor() {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let active = true;
    fetch("/api/admin/content?type=site&slug=client-logos").then(async response => {
      if (!response.ok) throw new Error("Unable to load brand logos.");
      return response.json();
    }).then(data => { if (active) { setLogos(data); setLoaded(true); } }).catch(error => { if (active) setStatus(error.message); });
    return () => { active = false; };
  }, []);
  const update = (index: number, patch: Partial<ClientLogo>) => {
    setLogos(current => current.map((logo, i) => i === index ? { ...logo, ...patch } : logo));
    setStatus("");
  };
  const move = (index: number, direction: number) => {
    setLogos(current => { const next = [...current]; [next[index], next[index + direction]] = [next[index + direction], next[index]]; return next; });
    setStatus("");
  };
  const save = async () => {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "site", slug: "client-logos", data: logos }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save brand logos.");
      setStatus("Brand logos saved.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Unable to save brand logos."); }
    finally { setSaving(false); }
  };
  return <section aria-label="Brand logos editor" style={{ display: "grid", gap: "1rem", padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "20px" }}>
    <h3>Brands we work with</h3>
    <p>Add, edit, remove, or reorder homepage logos. Upload new images in Media Upload, then paste their image paths here. Save brand logos separately below.</p>
    {loaded && logos.map((logo, index) => <fieldset key={index} style={{ display: "grid", gap: ".75rem", padding: "1rem", border: "1px solid #e5e7eb", borderRadius: "16px", minWidth: 0 }}>
      <legend>Logo {index + 1}</legend>
      <label>Brand name<input style={inputStyle} value={logo.alt} onChange={event => update(index, { alt: event.target.value })} /></label>
      <label>Image path<input style={inputStyle} value={logo.src} onChange={event => update(index, { src: event.target.value })} placeholder="/images/brands/logo.webp" /></label>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button type="button" disabled={index === 0} onClick={() => move(index, -1)}>Move up</button>
        <button type="button" disabled={index === logos.length - 1} onClick={() => move(index, 1)}>Move down</button>
        <button type="button" onClick={() => { setLogos(current => current.filter((_, i) => i !== index)); setStatus(""); }}>Remove logo</button>
      </div>
    </fieldset>)}
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <button type="button" disabled={!loaded || saving} onClick={() => { setLogos(current => [...current, { src: "", alt: "" }]); setStatus(""); }}>Add logo</button>
      <button type="button" className="button" disabled={!loaded || saving || logos.some(logo => !logo.src.trim() || !logo.alt.trim())} onClick={save}>{saving ? "Saving…" : "Save brand logos"}</button>
    </div>
    <p role="status">{status || (!loaded ? "Loading brand logos…" : "")}</p>
  </section>;
}
