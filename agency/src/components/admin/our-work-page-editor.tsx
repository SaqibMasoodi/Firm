"use client";

import type { OurWorkPageSettings } from "@/lib/schemas/our-work-page-settings";

const fields = [
  ["title", "Page heading"],
  ["description", "Page description"],
  ["ctaTitle", "Contact section heading"],
  ["ctaDescription", "Contact section description"],
] as const;
const categories = [
  ["websites", "Websites"], ["apps", "Apps"], ["social-media", "Social Media Management"],
] as const;
const inputStyle = { width: "100%", padding: "0.85rem 1.2rem", border: "1px solid #e5e7eb", borderRadius: "16px", background: "#fff", color: "#171717", fontSize: "1rem", marginTop: "0.5rem" };

export default function OurWorkPageEditor({ value, onChange }: { value: OurWorkPageSettings; onChange: (value: OurWorkPageSettings) => void }) {
  if (!value?.sections || categories.some(([key]) => !value.sections[key])) {
    return <p>Loading page settings…</p>;
  }
  return (
    <div style={{ display: "grid", gap: "1.75rem" }}>
      <p>Edit the Our Work page text and choose which sections visitors can see. Hiding a section keeps its projects saved.</p>
      {fields.map(([key, label]) => <div key={key}>
        <label htmlFor={`work-page-${key}`}>{label}</label>
        <input id={`work-page-${key}`} value={value[key]} onChange={event => onChange({ ...value, [key]: event.target.value })} style={inputStyle} />
      </div>)}
      {categories.map(([key, label]) => {
        const section = value.sections[key];
        const update = (patch: Partial<typeof section>) => onChange({ ...value, sections: { ...value.sections, [key]: { ...section, ...patch } } });
        return <fieldset key={key} style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "20px", display: "grid", gap: "1.25rem" }}>
          <legend style={{ padding: "0 0.5rem", fontWeight: 600 }}>{label}</legend>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><input type="checkbox" checked={section.visible} onChange={event => update({ visible: event.target.checked })} />Show {label} section</label>
          {([['title', 'Heading'], ['description', 'Description'], ['emptyText', 'Message when there are no projects']] as const).map(([field, name]) => <div key={field}>
            <label htmlFor={`work-section-${key}-${field}`}>{label}: {name}</label>
            <input id={`work-section-${key}-${field}`} value={section[field]} onChange={event => update({ [field]: event.target.value })} style={inputStyle} />
          </div>)}
        </fieldset>;
      })}
    </div>
  );
}
