"use client";

import { useState } from "react";
import type { OurWorkPageSettings } from "@/lib/schemas/our-work-page-settings";

const inputStyle = { width: "100%", padding: "0.85rem 1.2rem", border: "1px solid #e5e7eb", borderRadius: "16px", background: "#fff", color: "#171717", fontSize: "1rem", marginTop: "0.5rem" };

export default function WorkCategoriesEditor({ value, onChange }: { value: OurWorkPageSettings; onChange: (value: OurWorkPageSettings) => void }) {
  const [newCategory, setNewCategory] = useState("");
  if (!value?.sections) {
    return <p>Loading page settings…</p>;
  }
  const categories = Object.entries(value.sections).map(([key, section]) => [key, section.title] as const);
  const addCategory = () => {
    const title = newCategory.trim();
    if (!title) return;
    let base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!/^[a-z]/.test(base) || base === "all") base = "category-" + (base || "new");
    let key = base, suffix = 2;
    while (Object.hasOwn(value.sections, key)) key = base + "-" + suffix++;
    onChange({ ...value, sections: { ...value.sections, [key]: { title, description: "", emptyText: "Projects will be added here soon.", visible: true } } });
    setNewCategory("");
  };
  const moveCategory = (key: string, direction: number) => {
    const entries = Object.entries(value.sections);
    const index = entries.findIndex(([id]) => id === key), target = index + direction;
    if (target < 0 || target >= entries.length) return;
    [entries[index], entries[target]] = [entries[target], entries[index]];
    onChange({ ...value, sections: Object.fromEntries(entries) });
  };
  const removeCategory = (key: string) => {
    if (categories.length <= 1) return;
    onChange({ ...value, sections: Object.fromEntries(Object.entries(value.sections).filter(([id]) => id !== key)) });
  };
  return (
    <div style={{ display: "grid", gap: "1.75rem" }}>
      <p>Add, rename, reorder, hide, or remove categories, then save categories. Removing a category moves its projects to the first remaining category. Keep at least one category.</p>
      <div style={{ display: "flex", alignItems: "end", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "180px" }}><label htmlFor="new-work-category">New category name</label><input id="new-work-category" style={inputStyle} value={newCategory} onChange={event => setNewCategory(event.target.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); addCategory(); } }} /></div>
        <button type="button" className="button" disabled={!newCategory.trim()} onClick={addCategory}>Add category</button>
      </div>
      {categories.map(([key, label], index) => {
        const section = value.sections[key];
        const update = (patch: Partial<typeof section>) => onChange({ ...value, sections: { ...value.sections, [key]: { ...section, ...patch } } });
        return <fieldset key={key} data-category-id={key} style={{ padding: "1.5rem", border: "1px solid #e5e7eb", borderRadius: "20px", display: "grid", gap: "1.25rem" }}>
          <legend style={{ padding: "0 0.5rem", fontWeight: 600 }}>{label}</legend>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="button" disabled={index === 0} onClick={() => moveCategory(key, -1)}>Move up</button>
            <button type="button" disabled={index === categories.length - 1} onClick={() => moveCategory(key, 1)}>Move down</button>
            <button type="button" disabled={categories.length === 1} onClick={() => removeCategory(key)}>Remove category</button>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}><input type="checkbox" checked={section.visible} onChange={event => update({ visible: event.target.checked })} />Show {label} in filter and grid</label>
          {([['title', 'Category name'], ['description', 'Description when selected'], ['emptyText', 'Message when there are no projects']] as const).map(([field, name]) => <div key={field}>
            <label htmlFor={`work-section-${key}-${field}`}>{label}: {name}</label>
            <input id={`work-section-${key}-${field}`} value={section[field]} onChange={event => update({ [field]: event.target.value })} style={inputStyle} />
          </div>)}
        </fieldset>;
      })}
    </div>
  );
}
