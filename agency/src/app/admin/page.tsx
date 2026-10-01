"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "@/components/ui/logo";

type Tab = "case-studies" | "featured-work" | "headers" | "blog" | "services" | "team" | "testimonials" | "site-config" | "upload";

interface ContentItem {
  filename: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

/* ===== Outline Icons Matching Northforge Aesthetic ===== */
function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <line x1="8" y1="9" x2="16" y2="9"/>
      <line x1="8" y1="13" x2="14" y2="13"/>
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function PhotoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("case-studies");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editForm, setEditForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inner nav pane state
  const [isNavPaneCollapsed, setIsNavPaneCollapsed] = useState<boolean>(false);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(0);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number>(0);

  // Raw JSON toggle & state
  const [isJsonMode, setIsJsonMode] = useState<boolean>(false);
  const [rawJsonText, setRawJsonText] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Featured Work state
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>([]);
  const [allCaseStudies, setAllCaseStudies] = useState<ContentItem[]>([]);

  // Page Headers state & focal position
  const [selectedHeaderKey, setSelectedHeaderKey] = useState<"home" | "about" | "services">("home");
  const [headersData, setHeadersData] = useState<{
    home: { image: string; objectPosition: string; alt?: string };
    about: { image: string; objectPosition: string; alt?: string };
    services: { image: string; objectPosition: string; alt?: string };
  }>({
    home: { image: "/images/hero/hero-main.jpg", objectPosition: "53% 43%", alt: "Northforge Labs Creative Office" },
    about: { image: "/images/headers/about-main.webp", objectPosition: "46% 36%", alt: "Modern office lobby" },
    services: { image: "/images/headers/services-main.webp", objectPosition: "75% 53%", alt: "Our services" },
  });

  const parsePosition = (posStr: string = "50% 50%") => {
    const parts = posStr.trim().split(/\s+/);
    let x = 50;
    let y = 50;
    if (parts.length >= 1) {
      if (parts[0] === "left") x = 0;
      else if (parts[0] === "center") x = 50;
      else if (parts[0] === "right") x = 100;
      else {
        const parsedX = parseFloat(parts[0]);
        if (!isNaN(parsedX)) x = parsedX;
      }
    }
    if (parts.length >= 2) {
      if (parts[1] === "top") y = 0;
      else if (parts[1] === "center") y = 50;
      else if (parts[1] === "bottom") y = 100;
      else {
        const parsedY = parseFloat(parts[1]);
        if (!isNaN(parsedY)) y = parsedY;
      }
    }
    return { x: Math.round(x), y: Math.round(y) };
  };

  const updateHeaderPosition = (key: "home" | "about" | "services", x: number, y: number) => {
    const clampedX = Math.max(0, Math.min(100, Math.round(x)));
    const clampedY = Math.max(0, Math.min(100, Math.round(y)));
    const newPos = `${clampedX}% ${clampedY}%`;
    const nextHeaders = {
      ...headersData,
      [key]: {
        ...headersData[key],
        objectPosition: newPos,
      },
    };
    setHeadersData(nextHeaders);
    updateEditForm(nextHeaders);
  };

  const updateHeaderField = (key: "home" | "about" | "services", field: "image" | "alt", val: string) => {
    const nextHeaders = {
      ...headersData,
      [key]: {
        ...headersData[key],
        [field]: val,
      },
    };
    setHeadersData(nextHeaders);
    updateEditForm(nextHeaders);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    let displayMessage = message;
    if (typeof message === "string" && message.startsWith("[") && message.includes('"message":')) {
      try {
        const parsed = JSON.parse(message);
        if (Array.isArray(parsed) && parsed.length > 0) {
          displayMessage = parsed
            .map((item: { path?: (string | number)[]; message?: string }) => {
              const field = item.path && item.path.length > 0 ? item.path.join(".") : "field";
              return `${field}: ${item.message || "Invalid value"}`;
            })
            .join("; ");
        }
      } catch {
        // Keep original message if parsing fails
      }
    }
    setToast({ message: displayMessage, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync rawJsonText when editForm changes from selection or form edits
  const updateEditForm = (newData: unknown) => {
    setEditForm(newData);
    setRawJsonText(JSON.stringify(newData, null, 2));
    setJsonError(null);
  };

  // Handle user typing/pasting into raw JSON editor
  const handleRawJsonChange = (text: string) => {
    setRawJsonText(text);
    try {
      const parsed = JSON.parse(text);
      if (activeTab === "featured-work") {
        if (Array.isArray(parsed)) {
          setFeaturedSlugs(parsed);
        }
      } else if (activeTab === "headers") {
        if (parsed && typeof parsed === "object") {
          setHeadersData(parsed);
        }
      } else {
        setEditForm(parsed);
      }
      setJsonError(null);
    } catch (err) {
      setJsonError((err as Error).message);
    }
  };

  const formatRawJson = () => {
    try {
      const parsed = JSON.parse(rawJsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setRawJsonText(formatted);
      if (activeTab === "featured-work") {
        if (Array.isArray(parsed)) {
          setFeaturedSlugs(parsed);
        }
      } else if (activeTab === "headers") {
        if (parsed && typeof parsed === "object") {
          setHeadersData(parsed);
        }
      } else {
        setEditForm(parsed);
      }
      setJsonError(null);
      showToast("JSON formatted cleanly!");
    } catch (err) {
      showToast("Cannot format: " + (err as Error).message, "error");
    }
  };

  const toggleViewMode = (toRawJson: boolean) => {
    if (toRawJson) {
      if (activeTab === "featured-work") {
        setRawJsonText(JSON.stringify(featuredSlugs, null, 2));
      } else if (activeTab === "headers") {
        setRawJsonText(JSON.stringify(headersData, null, 2));
      } else if (editForm) {
        setRawJsonText(JSON.stringify(editForm, null, 2));
      }
      setJsonError(null);
      setIsJsonMode(true);
    } else {
      try {
        if (rawJsonText) {
          const parsed = JSON.parse(rawJsonText);
          if (activeTab === "featured-work") {
            if (Array.isArray(parsed)) {
              setFeaturedSlugs(parsed);
            }
          } else if (activeTab === "headers") {
            if (parsed && typeof parsed === "object") {
              setHeadersData(parsed);
            }
          } else if (editForm) {
            if (parsed && typeof parsed === "object") {
              setEditForm(parsed);
            }
          }
        }
        setJsonError(null);
      } catch (err) {
        setJsonError((err as Error).message);
      }
      setIsJsonMode(false);
    }
  };

  const triggerSave = () => {
    if (activeTab === "featured-work") {
      saveFeaturedWork();
    } else if (activeTab === "headers") {
      saveHeaders();
    } else if (editForm) {
      handleSave();
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case "case-studies":
        return "Case Studies";
      case "featured-work":
        return "Homepage Featured Work";
      case "headers":
        return "Page Headers";
      case "blog":
        return "Blog Posts";
      case "services":
        return "Services";
      case "team":
        return "Team Members";
      case "testimonials":
        return "Client Testimonials";
      case "site-config":
        return "Site Configuration";
      case "upload":
        return "Media Upload";
      default:
        return activeTab;
    }
  };

  const canToggleJson = activeTab !== "upload" && (activeTab === "featured-work" || activeTab === "headers" || editForm !== null);
  const canSave = activeTab !== "upload" && (activeTab === "featured-work" || activeTab === "headers" || editForm !== null);
  const isDeletable = (activeTab === "case-studies" || activeTab === "blog" || activeTab === "services") && editForm !== null;

  // Inner nav pane helpers
  const hasInnerNav =
    activeTab === "case-studies" ||
    activeTab === "blog" ||
    activeTab === "services" ||
    activeTab === "team" ||
    activeTab === "testimonials" ||
    activeTab === "headers";

  const getInnerNavIcon = () => {
    switch (activeTab) {
      case "case-studies": return <FolderIcon />;
      case "blog": return <ChatBubbleIcon />;
      case "services": return <BoltIcon />;
      case "team": return <UserIcon />;
      case "testimonials": return <StarIcon />;
      case "headers": return <ImageIcon />;
      default: return null;
    }
  };

  const getInnerNavTitle = () => {
    switch (activeTab) {
      case "case-studies": return "Case Studies";
      case "blog": return "Blog Posts";
      case "services": return "Services";
      case "team": return "Team";
      case "testimonials": return "Testimonials";
      case "headers": return "Headers";
      default: return "";
    }
  };

  const canCreateInInnerNav =
    activeTab === "case-studies" ||
    activeTab === "blog" ||
    activeTab === "services" ||
    activeTab === "team" ||
    activeTab === "testimonials";

  const handleInnerCreate = () => {
    if (activeTab === "team") {
      addTeamMember();
      // Select last (newly added)
      setTimeout(() => {
        const len = Array.isArray(editForm) ? editForm.length : 0;
        setSelectedTeamIndex(len);
      }, 0);
    } else if (activeTab === "testimonials") {
      const currentList = Array.isArray(editForm?.testimonials)
        ? [...editForm.testimonials]
        : Array.isArray(editForm)
        ? [...editForm]
        : [];
      const newItem = {
        id: `testimonial-${Date.now().toString().slice(-4)}`,
        author: "New Client",
        role: "Founder / Executive",
        quote: "Working with this team transformed our brand and customer growth.",
        rating: 5,
      };
      updateEditForm({
        ...editForm,
        testimonials: [...currentList, newItem],
      });
      setTimeout(() => setSelectedTestimonialIndex(currentList.length), 0);
    } else {
      createNewItem();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInnerNavItems = (): { key: string; title: string; icon: React.ReactNode }[] => {
    switch (activeTab) {
      case "case-studies":
      case "blog":
      case "services":
        return items.map((item) => ({
          key: item.slug,
          title: item.data.title || item.slug,
          icon: getInnerNavIcon(),
        }));
      case "team":
        return (Array.isArray(editForm) ? editForm : []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (member: any, idx: number) => ({
            key: member.id || `member-${idx}`,
            title: member.name || `Member #${idx + 1}`,
            icon: <UserIcon />,
          })
        );
      case "testimonials": {
        const tList = Array.isArray(editForm?.testimonials)
          ? editForm.testimonials
          : Array.isArray(editForm)
          ? editForm
          : [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return tList.map((t: any, idx: number) => ({
          key: t.id || `testimonial-${idx}`,
          title: t.author || `Testimonial #${idx + 1}`,
          icon: <StarIcon />,
        }));
      }
      case "headers":
        return [
          { key: "home", title: "Homepage Hero", icon: <ImageIcon /> },
          { key: "about", title: "About Page Hero", icon: <ImageIcon /> },
          { key: "services", title: "Services Page Hero", icon: <ImageIcon /> },
        ];
      default:
        return [];
    }
  };

  const getSelectedInnerKey = (): string | null => {
    switch (activeTab) {
      case "case-studies":
      case "blog":
      case "services":
        return selectedSlug;
      case "team":
        return (Array.isArray(editForm) && editForm[selectedTeamIndex]?.id) || null;
      case "testimonials": {
        const tList = Array.isArray(editForm?.testimonials) ? editForm.testimonials : [];
        return tList[selectedTestimonialIndex]?.id || null;
      }
      case "headers":
        return selectedHeaderKey;
      default:
        return null;
    }
  };

  const handleInnerNavSelect = (key: string, index: number) => {
    switch (activeTab) {
      case "case-studies":
      case "blog":
      case "services": {
        const item = items.find((i) => i.slug === key);
        if (item) selectItem(item);
        break;
      }
      case "team":
        setSelectedTeamIndex(index);
        break;
      case "testimonials":
        setSelectedTestimonialIndex(index);
        break;
      case "headers":
        setSelectedHeaderKey(key as "home" | "about" | "services");
        break;
    }
  };

  const selectItem = (item: ContentItem) => {
    setSelectedSlug(item.slug);
    setIsJsonMode(false);
    updateEditForm(JSON.parse(JSON.stringify(item.data)));
  };

  const loadTabContent = async (tab: Tab) => {
    setLoading(true);
    setSelectedSlug(null);
    setEditForm(null);
    setRawJsonText("");
    setJsonError(null);
    setIsJsonMode(false);

    try {
      if (tab === "featured-work") {
        const [caseStudiesRes, featuredRes] = await Promise.all([
          fetch("/api/admin/content?type=case-studies"),
          fetch("/api/admin/content?type=site&slug=featured-work"),
        ]);
        const caseStudiesData = await caseStudiesRes.json();
        const featuredData = await featuredRes.json();

        const studies = Array.isArray(caseStudiesData) ? caseStudiesData : [];
        const slugs = Array.isArray(featuredData) ? featuredData : [];

        setAllCaseStudies(studies);
        setFeaturedSlugs(slugs);
        setRawJsonText(JSON.stringify(slugs, null, 2));
      } else if (tab === "headers") {
        const res = await fetch("/api/admin/content?type=site&slug=headers");
        const data = await res.json();
        if (data && data.home) {
          setHeadersData(data);
          updateEditForm(data);
        }
        setSelectedSlug("headers");
      } else if (tab === "site-config") {
        const res = await fetch("/api/admin/content?type=site&slug=config");
        const data = await res.json();
        updateEditForm(data);
        setSelectedSlug("config");
      } else if (tab === "team") {
        const res = await fetch("/api/admin/content?type=site&slug=team");
        const data = await res.json();
        updateEditForm(data);
        setSelectedSlug("team");
      } else if (tab === "testimonials") {
        const res = await fetch("/api/admin/content?type=site&slug=testimonials");
        const data = await res.json();
        const normalized = Array.isArray(data)
          ? { image: "/images/testimonials/client-showcase.webp", testimonials: data }
          : {
              image: data?.image || "/images/testimonials/client-showcase.webp",
              testimonials: Array.isArray(data?.testimonials) ? data.testimonials : [],
            };
        updateEditForm(normalized);
        setSelectedSlug("testimonials");
      } else {
        const res = await fetch(`/api/admin/content?type=${tab}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setItems(data);
          if (data.length > 0) {
            selectItem(data[0]);
          }
        }
      }
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Load items when active tab changes
  useEffect(() => {
    if (activeTab === "upload") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTabContent(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const createNewItem = () => {
    const newSlug = `new-${activeTab.slice(0, -1)}-${Date.now().toString().slice(-4)}`;
    let template = {};
    if (activeTab === "case-studies") {
      template = {
        id: newSlug,
        slug: newSlug,
        title: "New Case Study",
        description: "A short summary of the client and project.",
        image: `/images/case-studies/${newSlug}/cover.webp`,
        siteUrl: "https://",
        tags: ["Web App", "Branding"],
        client: "Client Name",
        challenge: "Explain the client problem.",
        solution: "Explain the solution provided.",
        results: ["100% Growth", "40% More Leads"],
      };
    } else if (activeTab === "blog") {
      template = {
        id: newSlug,
        slug: newSlug,
        title: "New Blog Post",
        excerpt: "A short teaser of the article.",
        content: "# Post Title\n\nWrite markdown body content here.",
        image: `/images/blog/${newSlug}/cover.webp`,
        author: "Northforge Labs Team",
        date: new Date().toISOString().split("T")[0],
        category: "Insights",
        readTime: "4 min read",
      };
    } else if (activeTab === "services") {
      template = {
        id: newSlug,
        slug: newSlug,
        title: "New Service",
        description: "Comprehensive service description.",
        image: `/images/services/${newSlug}/illustration.webp`,
        features: ["Strategy & Planning", "Full Implementation", "Ongoing Optimization"],
      };
    }

    setSelectedSlug(newSlug);
    setIsJsonMode(false);
    updateEditForm(template);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const targetSection =
        activeTab === "blog"
          ? "blog"
          : activeTab === "services"
          ? "services"
          : activeTab === "case-studies"
          ? "case-studies"
          : activeTab === "testimonials"
          ? "testimonials"
          : activeTab === "headers"
          ? "headers"
          : "general";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("section", targetSection);
      formData.append("category", targetSection);
      if (activeTab !== "headers" && selectedSlug) {
        formData.append("slug", selectedSlug);
        formData.append("subfolder", selectedSlug);
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");

      const uploadedUrl = result.url || result.path;
      if (!uploadedUrl) {
        throw new Error("Upload succeeded but no image URL was returned");
      }

      showToast(`Uploaded ${result.filename || file.name}`);

      if (activeTab === "headers") {
        updateHeaderField(selectedHeaderKey, "image", uploadedUrl);
      } else if (editForm && typeof editForm === "object") {
        updateEditForm({ ...editForm, image: uploadedUrl });
      }
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (e.target) e.target.value = "";
    }
  };

  const moveTeamMember = (index: number, direction: "up" | "down") => {
    const currentList = Array.isArray(editForm) ? [...editForm] : [];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;
    const temp = currentList[index];
    currentList[index] = currentList[targetIndex];
    currentList[targetIndex] = temp;
    updateEditForm(currentList);
  };

  const addTeamMember = () => {
    const currentList = Array.isArray(editForm) ? [...editForm] : [];
    const newMember = {
      id: `member-${Date.now().toString().slice(-4)}`,
      name: "New Member",
      role: "Team Role",
      bio: "Short bio describing their expertise and contributions.",
      image: "/images/avatar.svg",
      socials: {
        linkedin: "",
        twitter: "",
      },
    };
    updateEditForm([...currentList, newMember]);
  };

  const removeTeamMember = (index: number) => {
    const currentList = Array.isArray(editForm) ? [...editForm] : [];
    currentList.splice(index, 1);
    updateEditForm(currentList);
  };

  const updateTeamMemberField = (index: number, field: string, value: string) => {
    const currentList = Array.isArray(editForm) ? [...editForm] : [];
    if (!currentList[index]) return;
    if (field.startsWith("socials.")) {
      const socialKey = field.split(".")[1];
      currentList[index] = {
        ...currentList[index],
        socials: {
          ...(currentList[index].socials || {}),
          [socialKey]: value,
        },
      };
    } else {
      currentList[index] = {
        ...currentList[index],
        [field]: value,
      };
    }
    updateEditForm(currentList);
  };

  const handleTeamAvatarUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", "team");
    const currentMember = Array.isArray(editForm) ? editForm[index] : null;
    if (currentMember?.id) {
      formData.append("slug", currentMember.id);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Upload failed");
      }

      const uploadedUrl = result.url || result.path;
      if (!uploadedUrl) throw new Error("Upload did not return an image URL");

      showToast(`Uploaded avatar for ${currentMember?.name || `Member #${index + 1}`}`);
      updateTeamMemberField(index, "image", uploadedUrl);
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setUploadingIndex(null);
      if (e.target) e.target.value = "";
    }
  };

  const handleSave = async () => {
    if (!editForm || !selectedSlug) return;

    let dataToSave = editForm;
    if (isJsonMode) {
      try {
        dataToSave = JSON.parse(rawJsonText);
      } catch (err) {
        showToast("Invalid JSON syntax: " + (err as Error).message, "error");
        return;
      }
    }

    setLoading(true);
    try {
      const isSiteType = activeTab === "site-config" || activeTab === "team" || activeTab === "testimonials";
      const type = isSiteType ? "site" : activeTab;
      const slug = isSiteType
        ? (activeTab === "site-config" ? "config" : activeTab === "testimonials" ? "testimonials" : "team")
        : selectedSlug;

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          slug,
          data: dataToSave,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save failed");

      showToast(`Saved ${slug}.json successfully!`);
      loadTabContent(activeTab);
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const saveFeaturedWork = async () => {
    let slugsToSave = featuredSlugs;
    if (isJsonMode) {
      try {
        slugsToSave = JSON.parse(rawJsonText);
        if (!Array.isArray(slugsToSave)) throw new Error("Featured work must be an array of slugs");
      } catch (err) {
        showToast((err as Error).message, "error");
        return;
      }
    }

    if (slugsToSave.length > 3) {
      showToast("Maximum 3 case studies can be featured on the homepage.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "site",
          slug: "featured-work",
          data: slugsToSave,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save failed");
      showToast("Homepage featured work updated successfully!");
      setFeaturedSlugs(slugsToSave);
      setRawJsonText(JSON.stringify(slugsToSave, null, 2));
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const saveHeaders = async () => {
    let dataToSave = headersData;
    if (isJsonMode) {
      try {
        dataToSave = JSON.parse(rawJsonText);
      } catch (err) {
        showToast("Invalid JSON: " + (err as Error).message, "error");
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "site",
          slug: "headers",
          data: dataToSave,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Save failed");
      showToast("Page headers updated successfully!");
      setHeadersData(dataToSave);
      setRawJsonText(JSON.stringify(dataToSave, null, 2));
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSlug) return;
    if (!confirm(`Are you sure you want to delete ${selectedSlug}? This removes the file.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?type=${activeTab}&slug=${selectedSlug}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Delete failed");
      showToast(`Deleted ${selectedSlug}`);
      loadTabContent(activeTab);
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleFeaturedSlug = (slug: string) => {
    let next: string[];
    if (featuredSlugs.includes(slug)) {
      next = featuredSlugs.filter((s) => s !== slug);
    } else {
      if (featuredSlugs.length >= 3) {
        showToast("Maximum 3 case studies can be featured. Remove one first.", "error");
        return;
      }
      next = [...featuredSlugs, slug];
    }
    setFeaturedSlugs(next);
    setRawJsonText(JSON.stringify(next, null, 2));
  };

  const moveFeaturedSlug = (index: number, direction: "up" | "down") => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= featuredSlugs.length) return;
    const next = [...featuredSlugs];
    const [moved] = next.splice(index, 1);
    next.splice(newIdx, 0, moved);
    setFeaturedSlugs(next);
    setRawJsonText(JSON.stringify(next, null, 2));
  };

  const navTabs = [
    { id: "case-studies", label: "Case Studies", icon: <FolderIcon /> },
    { id: "featured-work", label: "Featured Work (Home)", icon: <StarIcon /> },
    { id: "headers", label: "Page Headers", icon: <ImageIcon /> },
    { id: "blog", label: "Blog Posts", icon: <ChatBubbleIcon /> },
    { id: "services", label: "Services", icon: <BoltIcon /> },
    { id: "team", label: "Team Members", icon: <UsersIcon /> },
    { id: "testimonials", label: "Testimonials", icon: <StarIcon /> },
    { id: "site-config", label: "Site Settings", icon: <SettingsIcon /> },
    { id: "upload", label: "Media Upload", icon: <PhotoIcon /> },
  ];

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundColor: "var(--light-grey, #f8f8f8)",
      color: "var(--black, #171717)",
      fontFamily: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Sidebar Tabs */}
      <aside style={{
        width: "250px",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0,
        height: "100vh",
        position: "relative"
      }}>
        {/* Collapsible toggle arrow on right border */}
        {hasInnerNav && (
          <button
            type="button"
            onClick={() => setIsNavPaneCollapsed(!isNavPaneCollapsed)}
            title={isNavPaneCollapsed ? "Expand Submenu" : "Collapse Submenu"}
            style={{
              position: "absolute",
              right: "-12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: "var(--green, #cbfb45)",
              border: "2px solid #ffffff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: 0,
              transition: "transform 0.2s ease"
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#171717"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isNavPaneCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease"
              }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
          {/* Flush Logo Header (68px) */}
          <div style={{
            height: "68px",
            display: "flex",
            alignItems: "center",
            padding: "0 1.25rem",
            borderBottom: "1px solid #e5e7eb",
            boxSizing: "border-box",
            flexShrink: 0
          }}>
            <Logo variant="admin" />
          </div>

          {/* Navigation Tab Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1rem", overflowY: "auto", flex: 1 }}>
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setIsJsonMode(false);
                  }}
                  style={{
                    textAlign: "left",
                    padding: "0.75rem 1.1rem",
                    borderRadius: "14px",
                    border: "none",
                    backgroundColor: isActive ? "var(--green, #cbfb45)" : "transparent",
                    color: isActive ? "var(--black, #171717)" : "#4b5563",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    transition: "all 0.15s ease"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", color: isActive ? "#171717" : "#4b5563" }}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Admin footer at bottom of sidebar */}
        <div style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#171717",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.8rem"
            }}>
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.825rem", fontWeight: 600, color: "#171717" }}>Admin</span>
            </div>
          </div>
        </div>
      </aside>

        {/* Uniform Inner Nav Pane (collapsible, matching sidebar design) */}
        {hasInnerNav && (
          <div style={{
            width: isNavPaneCollapsed ? "0px" : "250px",
            backgroundColor: "#ffffff",
            borderRight: isNavPaneCollapsed ? "none" : "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            height: "100vh",
            overflow: "hidden",
            transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
            boxSizing: "border-box"
          }}>
            <div style={{ width: "250px", display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Flush Inner Nav Header (68px) */}
              <div style={{
                height: "68px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1.25rem",
                borderBottom: "1px solid #e5e7eb",
                boxSizing: "border-box",
                flexShrink: 0
              }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>
                  {getInnerNavTitle()}
                </span>
                {canCreateInInnerNav && (
                  <button
                    type="button"
                    onClick={handleInnerCreate}
                    style={{
                      backgroundColor: "var(--green, #cbfb45)",
                      color: "var(--black, #171717)",
                      border: "none",
                      borderRadius: "100rem",
                      padding: "0.3rem 0.85rem",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    + New
                  </button>
                )}
              </div>

              {/* Item List with Identical Button Design */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", padding: "1rem", overflowY: "auto", flex: 1 }}>
                {getInnerNavItems().map((navItem, idx) => {
                  const isSelected = navItem.key === getSelectedInnerKey();
                  return (
                    <button
                      key={navItem.key}
                      type="button"
                      onClick={() => handleInnerNavSelect(navItem.key, idx)}
                      style={{
                        textAlign: "left",
                        padding: "0.75rem 1.1rem",
                        borderRadius: "14px",
                        border: "none",
                        backgroundColor: isSelected ? "var(--green, #cbfb45)" : "transparent",
                        color: isSelected ? "var(--black, #171717)" : "#4b5563",
                        fontWeight: isSelected ? 600 : 500,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        transition: "all 0.15s ease",
                        width: "100%"
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: isSelected ? "#171717" : "#4b5563" }}>
                        {navItem.icon}
                      </span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {navItem.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Editor Canvas Workspace */}
        <main style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--light-grey, #f8f8f8)",
          position: "relative"
        }}>
          {/* Uniform Sticky Header Bar across ALL sections (68px flush) */}
          <header style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            height: "68px",
            backgroundColor: "rgba(248, 248, 248, 0.94)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid #e5e7eb",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
            flexShrink: 0,
            boxSizing: "border-box"
          }}>
            {/* Section Name & Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", minWidth: 0 }}>
              <h1 style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#111827",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}>
                {getSectionTitle()}
              </h1>
              {activeTab === "featured-work" && (
                <span style={{
                  backgroundColor: featuredSlugs.length === 3 ? "var(--green, #cbfb45)" : "#fee2e2",
                  color: featuredSlugs.length === 3 ? "var(--black, #171717)" : "#ef4444",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.2rem 0.65rem",
                  borderRadius: "100rem",
                  whiteSpace: "nowrap"
                }}>
                  {featuredSlugs.length} / 3 Selected
                </span>
              )}
            </div>

            {/* Controls: [ Form View | Raw JSON ] + [Delete] + [Save Changes] */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
              {canToggleJson && (
                <div style={{
                  display: "inline-flex",
                  backgroundColor: "#e5e7eb",
                  padding: "3px",
                  borderRadius: "100rem",
                  gap: "2px"
                }}>
                  <button
                    type="button"
                    onClick={() => toggleViewMode(false)}
                    style={{
                      padding: "0.4rem 1.15rem",
                      borderRadius: "100rem",
                      border: "none",
                      fontSize: "0.825rem",
                      fontWeight: !isJsonMode ? 600 : 500,
                      backgroundColor: !isJsonMode ? "#ffffff" : "transparent",
                      color: !isJsonMode ? "#111827" : "#4b5563",
                      boxShadow: !isJsonMode ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    Form View
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleViewMode(true)}
                    style={{
                      padding: "0.4rem 1.15rem",
                      borderRadius: "100rem",
                      border: "none",
                      fontSize: "0.825rem",
                      fontWeight: isJsonMode ? 600 : 500,
                      backgroundColor: isJsonMode ? "#ffffff" : "transparent",
                      color: isJsonMode ? "#111827" : "#4b5563",
                      boxShadow: isJsonMode ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    Raw JSON
                  </button>
                </div>
              )}

              {/* Delete button (for items in case-studies, blog, services) */}
              {isDeletable && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  style={{
                    backgroundColor: "#ffffff",
                    color: "#ef4444",
                    border: "1px solid #fee2e2",
                    padding: "0.45rem 1.1rem",
                    borderRadius: "100rem",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  Delete
                </button>
              )}

              {/* Save Button */}
              {canSave && (
                <button
                  type="button"
                  onClick={triggerSave}
                  disabled={loading}
                  style={{
                    backgroundColor: "var(--black, #171717)",
                    color: "var(--white, #ffffff)",
                    border: "none",
                    padding: "0.5rem 1.4rem",
                    borderRadius: "100rem",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                    transition: "opacity 0.15s ease"
                  }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </header>

          {/* Main Content Workspace Canvas */}
          <div style={{
            flex: 1,
            padding: activeTab === "case-studies" || activeTab === "blog" || activeTab === "services"
              ? "2rem 2.5rem 3rem 1.25rem"
              : "2rem 2.5rem 3rem 2.5rem",
            maxWidth: "1000px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box"
          }}>
            {isJsonMode && activeTab !== "upload" ? (
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "28px",
                border: "1px solid #e5e7eb",
                padding: "2.25rem 2.5rem",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", color: jsonError ? "#ef4444" : "#10b981", fontWeight: 600 }}>
                    {jsonError ? `✗ ${jsonError}` : "✓ Valid JSON"}
                  </span>
                  <button
                    type="button"
                    onClick={formatRawJson}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #e5e7eb",
                      color: "#374151",
                      borderRadius: "100rem",
                      padding: "0.35rem 0.85rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: 500
                    }}
                  >
                    Format JSON
                  </button>
                </div>
                <textarea
                  rows={24}
                  value={rawJsonText}
                  onChange={(e) => handleRawJsonChange(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "1.25rem",
                    backgroundColor: "#fcfcfc",
                    border: `1px solid ${jsonError ? "#ef4444" : "#e5e7eb"}`,
                    borderRadius: "16px",
                    color: "#171717",
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    lineHeight: "1.55",
                    boxSizing: "border-box",
                    outline: "none"
                  }}
                />
              </div>
            ) : activeTab === "upload" ? (
              <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "28px",
                  border: "1px solid #e5e5e5",
                  padding: "3.5rem 2.5rem",
                  textAlign: "center"
                }}>
                  <div style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "20px",
                    padding: "3.5rem 2rem",
                    backgroundColor: "#fafafa"
                  }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      id="admin-file-upload"
                    />
                    <label
                      htmlFor="admin-file-upload"
                      style={{
                        backgroundColor: "var(--green, #cbfb45)",
                        color: "var(--black, #171717)",
                        padding: "0.75rem 1.75rem",
                        borderRadius: "100rem",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        display: "inline-block",
                        border: "none"
                      }}
                    >
                      {uploading ? "Uploading image..." : "Select Image from Computer"}
                    </label>
                    <div style={{ marginTop: "1.25rem", color: "#6b7280", fontSize: "0.85rem" }}>
                      Supports WebP, PNG, JPG, and SVG
                    </div>
                  </div>
                </div>
              </div>
            ) : activeTab === "featured-work" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {/* Current Featured Card */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "32px",
                    border: "1px solid #e5e5e5",
                    padding: "2rem"
                  }}>
                    <h2 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", marginBottom: "1rem", fontWeight: 600 }}>
                      Current Homepage Order ({featuredSlugs.length}/3)
                    </h2>

                    {featuredSlugs.length === 0 ? (
                      <div style={{ padding: "2rem", textAlign: "center", color: "#9ca3af", fontSize: "0.9rem" }}>
                        No case studies selected. Pick up to 3 below.
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {featuredSlugs.map((slug, idx) => {
                          const study = allCaseStudies.find((s) => s.slug === slug);
                          return (
                            <div
                              key={slug}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "1rem 1.25rem",
                                backgroundColor: "#f9fafb",
                                border: "1px solid #ebebeb",
                                borderRadius: "18px"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  backgroundColor: "#171717",
                                  color: "#ffffff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: 700,
                                  fontSize: "0.8rem"
                                }}>
                                  {idx + 1}
                                </div>
                                {study?.data?.image && (
                                  <div style={{ width: "54px", height: "36px", borderRadius: "8px", overflow: "hidden", position: "relative", backgroundColor: "#e5e5e5" }}>
                                    <Image src={study.data.image} alt="" fill sizes="54px" style={{ objectFit: "cover" }} />
                                  </div>
                                )}
                                <div>
                                  <div style={{ fontWeight: 600, color: "#171717", fontSize: "0.95rem" }}>
                                    {study?.data?.title || slug}
                                  </div>
                                  <div style={{ fontSize: "0.75rem", color: "#818181" }}>
                                    {slug}.json
                                  </div>
                                </div>
                              </div>

                              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                                <button
                                  onClick={() => moveFeaturedSlug(idx, "up")}
                                  disabled={idx === 0}
                                  style={{
                                    backgroundColor: idx === 0 ? "#f3f4f6" : "#ffffff",
                                    color: idx === 0 ? "#9ca3af" : "#171717",
                                    border: "1px solid #e5e5e5",
                                    padding: "0.35rem 0.65rem",
                                    borderRadius: "8px",
                                    cursor: idx === 0 ? "default" : "pointer"
                                  }}
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() => moveFeaturedSlug(idx, "down")}
                                  disabled={idx === featuredSlugs.length - 1}
                                  style={{
                                    backgroundColor: idx === featuredSlugs.length - 1 ? "#f3f4f6" : "#ffffff",
                                    color: idx === featuredSlugs.length - 1 ? "#9ca3af" : "#171717",
                                    border: "1px solid #e5e5e5",
                                    padding: "0.35rem 0.65rem",
                                    borderRadius: "8px",
                                    cursor: idx === featuredSlugs.length - 1 ? "default" : "pointer"
                                  }}
                                >
                                  ↓
                                </button>
                                <button
                                  onClick={() => toggleFeaturedSlug(slug)}
                                  style={{
                                    backgroundColor: "#fee2e2",
                                    color: "#ef4444",
                                    border: "none",
                                    padding: "0.4rem 0.85rem",
                                    borderRadius: "100rem",
                                    cursor: "pointer",
                                    fontSize: "0.8rem",
                                    fontWeight: 500
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* All Case Studies Picker */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "32px",
                    border: "1px solid #e5e5e5",
                    padding: "2rem"
                  }}>
                    <h2 style={{ fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", marginBottom: "1.25rem", fontWeight: 600 }}>
                      All Case Studies ({allCaseStudies.length})
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
                      {allCaseStudies.map((item) => {
                        const isFeatured = featuredSlugs.includes(item.slug);

                        return (
                          <div
                            key={item.slug}
                            style={{
                              backgroundColor: isFeatured ? "#fbfcf7" : "#ffffff",
                              border: isFeatured ? "2px solid var(--green, #cbfb45)" : "1px solid #e5e5e5",
                              borderRadius: "20px",
                              overflow: "hidden",
                              display: "flex",
                              flexDirection: "column"
                            }}
                          >
                            <div style={{ height: "140px", position: "relative", backgroundColor: "#f3f4f6" }}>
                              {item.data.image && (
                                <Image src={item.data.image} alt={item.data.title || item.slug} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                              )}
                              {isFeatured && (
                                <span style={{
                                  position: "absolute",
                                  top: "0.6rem",
                                  right: "0.6rem",
                                  backgroundColor: "var(--green, #cbfb45)",
                                  color: "var(--black, #171717)",
                                  fontWeight: 700,
                                  fontSize: "0.7rem",
                                  padding: "0.25rem 0.6rem",
                                  borderRadius: "100rem"
                                }}>
                                  ✓ Featured
                                </span>
                              )}
                            </div>

                            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                              <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#171717", marginBottom: "0.35rem" }}>
                                  {item.data.title}
                                </h3>
                                <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.4, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                  {item.data.description}
                                </p>
                              </div>

                              <button
                                onClick={() => toggleFeaturedSlug(item.slug)}
                                style={{
                                  width: "100%",
                                  padding: "0.55rem",
                                  borderRadius: "100rem",
                                  border: "none",
                                  fontWeight: 600,
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                  backgroundColor: isFeatured ? "#fee2e2" : "var(--black, #171717)",
                                  color: isFeatured ? "#ef4444" : "#ffffff"
                                }}
                              >
                                {isFeatured ? "✕ Remove from Homepage" : "+ Add to Homepage"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
            ) : activeTab === "headers" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                  {/* Hero Selection Cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    {[
                      { key: "home", label: "Homepage Hero Banner", aspect: "16:9 Widescreen" },
                      { key: "about", label: "About Page Hero", aspect: "4:3 Hero Card" },
                      { key: "services", label: "Services Page Hero", aspect: "4:3 Hero Card" },
                    ].map((card) => {
                      const isSelected = selectedHeaderKey === card.key;
                      return (
                        <button
                          key={card.key}
                          onClick={() => setSelectedHeaderKey(card.key as "home" | "about" | "services")}
                          style={{
                            padding: "1.35rem 1.5rem",
                            borderRadius: "20px",
                            border: isSelected ? "2px solid var(--black, #171717)" : "1px solid #e5e7eb",
                            backgroundColor: "#ffffff",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "all 0.15s ease",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            minHeight: "96px"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: isSelected ? "#111827" : "#374151", letterSpacing: "-0.01em" }}>
                              {card.label}
                            </div>
                            {isSelected && (
                              <span style={{
                                backgroundColor: "var(--green, #cbfb45)",
                                color: "var(--black, #171717)",
                                fontSize: "0.68rem",
                                fontWeight: 800,
                                letterSpacing: "0.04em",
                                padding: "0.2rem 0.55rem",
                                borderRadius: "100rem",
                                textTransform: "uppercase"
                              }}>
                                Active
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "0.4rem" }}>
                            Aspect Ratio: {card.aspect}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Header Editor in White Card */}
                  {(() => {
                    const currentHeader = headersData[selectedHeaderKey] || {
                      image: "/images/hero/hero-main.jpg",
                      objectPosition: "50% 50%",
                      alt: ""
                    };
                    const currentPos = parsePosition(currentHeader.objectPosition);
                    const is16by9 = selectedHeaderKey === "home";

                    return (
                      <div style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "32px",
                        border: "1px solid #e5e7eb",
                        padding: "2.75rem 3rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem"
                      }}>
                        {/* Image Path and Alt Text */}
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>
                              Header Image Path or URL
                            </label>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                              <input
                                type="text"
                                value={currentHeader.image}
                                onChange={(e) => updateHeaderField(selectedHeaderKey, "image", e.target.value)}
                                placeholder="/images/hero/hero-main.jpg"
                                style={{
                                  flex: 1,
                                  padding: "0.85rem 1.2rem",
                                  borderRadius: "16px",
                                  border: "1px solid #e5e7eb",
                                  backgroundColor: "#ffffff",
                                  color: "#111827",
                                  fontSize: "0.95rem",
                                  fontWeight: 600,
                                  outline: "none",
                                  boxSizing: "border-box"
                                }}
                              />
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="header-image-upload"
                              />
                              <label
                                htmlFor="header-image-upload"
                                style={{
                                  padding: "0.85rem 1.5rem",
                                  backgroundColor: "var(--black, #171717)",
                                  color: "var(--white, #ffffff)",
                                  borderRadius: "100rem",
                                  cursor: "pointer",
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  display: "inline-flex",
                                  alignItems: "center"
                                }}
                              >
                                {uploading ? "Uploading..." : "Upload New"}
                              </label>
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "0.35rem" }}>
                              Upload a new image file or paste a path/URL directly.
                            </div>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>
                              Alt / Accessibility Text
                            </label>
                            <input
                              type="text"
                              value={currentHeader.alt || ""}
                              onChange={(e) => updateHeaderField(selectedHeaderKey, "alt", e.target.value)}
                              placeholder="Image description"
                              style={{
                                width: "100%",
                                padding: "0.85rem 1.2rem",
                                borderRadius: "16px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#ffffff",
                                color: "#111827",
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                outline: "none",
                                boxSizing: "border-box"
                              }}
                            />
                          </div>
                        </div>

                        {/* Visible Window Preview Container */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div>
                              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#111827" }}>
                                Interactive Visible Window Preview
                              </div>
                              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.2rem" }}>
                                Frame is locked to {is16by9 ? "16:9 widescreen" : "4:3 hero card"}. Click or drag on the preview to position focal center.
                              </div>
                            </div>

                            <div style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.45rem",
                              backgroundColor: "#f4f5f7",
                              padding: "0.35rem 0.9rem",
                              borderRadius: "100rem",
                              fontSize: "0.8rem",
                              color: "#374151",
                              fontWeight: 600
                            }}>
                              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "var(--green, #cbfb45)" }} />
                              <span>Focal Point: {currentPos.x}%, {currentPos.y}%</span>
                            </div>
                          </div>

                          {/* The Window Frame */}
                          <div
                            onPointerDown={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const x = ((e.clientX - rect.left) / rect.width) * 100;
                              const y = ((e.clientY - rect.top) / rect.height) * 100;
                              updateHeaderPosition(selectedHeaderKey, x, y);
                            }}
                            onPointerMove={(e) => {
                              if (e.buttons === 1) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                updateHeaderPosition(selectedHeaderKey, x, y);
                              }
                            }}
                            style={{
                              position: "relative",
                              width: "100%",
                              aspectRatio: is16by9 ? "16 / 9" : "4 / 3",
                              maxHeight: "440px",
                              borderRadius: "24px",
                              overflow: "hidden",
                              backgroundColor: "#171717",
                              border: "1px solid #e5e7eb",
                              cursor: "crosshair",
                              userSelect: "none"
                            }}
                          >
                            {currentHeader.image && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={currentHeader.image}
                                alt={currentHeader.alt || "Header preview"}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  objectPosition: `${currentPos.x}% ${currentPos.y}%`,
                                  display: "block",
                                  pointerEvents: "none"
                                }}
                              />
                            )}

                            {/* Clean Reticle */}
                            <div
                              style={{
                                position: "absolute",
                                left: `${currentPos.x}%`,
                                top: `${currentPos.y}%`,
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}
                            >
                              <div style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                border: "2px solid #cbfb45",
                                backgroundColor: "rgba(203, 251, 69, 0.25)",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                              }}>
                                <div style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  backgroundColor: "#cbfb45"
                                }} />
                              </div>
                            </div>

                            {/* Badges */}
                            <div style={{
                              position: "absolute",
                              top: "14px",
                              left: "14px",
                              backgroundColor: "rgba(23, 23, 23, 0.8)",
                              color: "#ffffff",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                              padding: "0.35rem 0.8rem",
                              borderRadius: "100rem",
                              pointerEvents: "none"
                            }}>
                              VISIBLE WINDOW ({is16by9 ? "16:9 BANNER" : "4:3 HERO"})
                            </div>

                            <div style={{
                              position: "absolute",
                              bottom: "14px",
                              right: "14px",
                              backgroundColor: "rgba(23, 23, 23, 0.8)",
                              color: "#ffffff",
                              fontSize: "0.75rem",
                              padding: "0.35rem 0.8rem",
                              borderRadius: "100rem",
                              pointerEvents: "none"
                            }}>
                              Click or drag to reframe
                            </div>
                          </div>

                          {/* Sliders */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginTop: "0.5rem" }}>
                            <div style={{ backgroundColor: "#f9fafb", padding: "1.35rem 1.5rem", borderRadius: "20px", border: "1px solid #e5e7eb" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#171717" }}>
                                  Vertical Position (Y Axis)
                                </label>
                                <span style={{ fontSize: "0.85rem", color: "#171717", fontWeight: 700 }}>
                                  {currentPos.y}% {currentPos.y < 35 ? "(Top)" : currentPos.y > 65 ? "(Bottom)" : "(Center)"}
                                </span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={currentPos.y}
                                onChange={(e) => updateHeaderPosition(selectedHeaderKey, currentPos.x, parseFloat(e.target.value))}
                                style={{ width: "100%", accentColor: "#171717", cursor: "pointer" }}
                              />
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.35rem" }}>
                                <span>0% (Top)</span>
                                <span>50% (Center)</span>
                                <span>100% (Bottom)</span>
                              </div>
                            </div>

                            <div style={{ backgroundColor: "#f9fafb", padding: "1.35rem 1.5rem", borderRadius: "20px", border: "1px solid #e5e7eb" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#171717" }}>
                                  Horizontal Position (X Axis)
                                </label>
                                <span style={{ fontSize: "0.85rem", color: "#171717", fontWeight: 700 }}>
                                  {currentPos.x}% {currentPos.x < 35 ? "(Left)" : currentPos.x > 65 ? "(Right)" : "(Center)"}
                                </span>
                              </div>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={currentPos.x}
                                onChange={(e) => updateHeaderPosition(selectedHeaderKey, parseFloat(e.target.value), currentPos.y)}
                                style={{ width: "100%", accentColor: "#171717", cursor: "pointer" }}
                              />
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.35rem" }}>
                                <span>0% (Left)</span>
                                <span>50% (Center)</span>
                                <span>100% (Right)</span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Alignment Presets */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                            <span style={{ fontSize: "0.85rem", color: "#6b7280", fontWeight: 500, marginRight: "0.25rem" }}>
                              Quick Presets:
                            </span>
                            {[
                              { label: "Top", x: 50, y: 0 },
                              { label: "Center", x: 50, y: 50 },
                              { label: "Bottom", x: 50, y: 100 },
                              { label: "Left", x: 0, y: 50 },
                              { label: "Right", x: 100, y: 50 },
                            ].map((preset) => (
                              <button
                                key={preset.label}
                                onClick={() => updateHeaderPosition(selectedHeaderKey, preset.x, preset.y)}
                                style={{
                                  backgroundColor: "#ffffff",
                                  border: "1px solid #e5e7eb",
                                  color: "#374151",
                                  padding: "0.4rem 1.1rem",
                                  borderRadius: "100rem",
                                  fontSize: "0.8rem",
                                  cursor: "pointer",
                                  fontWeight: 600,
                                  transition: "all 0.15s ease"
                                }}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
            ) : editForm ? (
              <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "28px",
                border: "1px solid #e5e7eb",
                padding: "2.5rem 3rem"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                    {activeTab === "case-studies" && (
                      <>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Title</label>
                          <input
                            type="text"
                            value={editForm.title || ""}
                            onChange={(e) => updateEditForm({ ...editForm, title: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Slug</label>
                            <input
                              type="text"
                              value={editForm.slug || ""}
                              onChange={(e) => updateEditForm({ ...editForm, slug: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Client</label>
                            <input
                              type="text"
                              value={editForm.client || ""}
                              onChange={(e) => updateEditForm({ ...editForm, client: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Description</label>
                          <textarea
                            rows={3}
                            value={editForm.description || ""}
                            onChange={(e) => updateEditForm({ ...editForm, description: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Cover Image Path</label>
                          <div style={{ display: "flex", gap: "0.75rem" }}>
                            <input
                              type="text"
                              value={editForm.image || ""}
                              onChange={(e) => updateEditForm({ ...editForm, image: e.target.value })}
                              style={{ flex: 1, padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: "none" }}
                              id="image-field-upload"
                            />
                            <label
                              htmlFor="image-field-upload"
                              style={{
                                padding: "0.85rem 1.5rem",
                                backgroundColor: "var(--black, #171717)",
                                color: "var(--white, #ffffff)",
                                borderRadius: "100rem",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                display: "inline-flex",
                                alignItems: "center"
                              }}
                            >
                              {uploading ? "Uploading..." : "Upload New"}
                            </label>
                          </div>
                          {editForm.image && (
                            <div style={{ marginTop: "0.75rem", borderRadius: "18px", overflow: "hidden", width: "140px", height: "75px", position: "relative", border: "1px solid #e5e7eb" }}>
                              <Image src={editForm.image} alt="Preview" fill sizes="140px" style={{ objectFit: "cover" }} />
                            </div>
                          )}
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Live Site URL</label>
                          <input
                            type="url"
                            placeholder="https://example.com"
                            value={editForm.siteUrl || ""}
                            onChange={(e) => updateEditForm({ ...editForm, siteUrl: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 500, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Tags (Comma separated)</label>
                          <input
                            type="text"
                            value={(editForm.tags || []).join(", ")}
                            onChange={(e) => updateEditForm({ ...editForm, tags: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Challenge</label>
                          <textarea
                            rows={3}
                            value={editForm.challenge || ""}
                            onChange={(e) => updateEditForm({ ...editForm, challenge: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Solution</label>
                          <textarea
                            rows={3}
                            value={editForm.solution || ""}
                            onChange={(e) => updateEditForm({ ...editForm, solution: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Results (One per line)</label>
                          <textarea
                            rows={4}
                            value={(editForm.results || []).join("\n")}
                            onChange={(e) => updateEditForm({ ...editForm, results: e.target.value.split("\n").filter(Boolean) })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "blog" && (
                      <>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Title</label>
                          <input
                            type="text"
                            value={editForm.title || ""}
                            onChange={(e) => updateEditForm({ ...editForm, title: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Slug</label>
                            <input
                              type="text"
                              value={editForm.slug || ""}
                              onChange={(e) => updateEditForm({ ...editForm, slug: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Author</label>
                            <input
                              type="text"
                              value={editForm.author || ""}
                              onChange={(e) => updateEditForm({ ...editForm, author: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Category</label>
                            <input
                              type="text"
                              value={editForm.category || ""}
                              onChange={(e) => updateEditForm({ ...editForm, category: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Excerpt</label>
                          <textarea
                            rows={2}
                            value={editForm.excerpt || ""}
                            onChange={(e) => updateEditForm({ ...editForm, excerpt: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Cover Image Path</label>
                          <div style={{ display: "flex", gap: "0.75rem" }}>
                            <input
                              type="text"
                              value={editForm.image || ""}
                              onChange={(e) => updateEditForm({ ...editForm, image: e.target.value })}
                              style={{ flex: 1, padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              style={{ display: "none" }}
                              id="blog-image-upload"
                            />
                            <label
                              htmlFor="blog-image-upload"
                              style={{
                                padding: "0.85rem 1.5rem",
                                backgroundColor: "var(--black, #171717)",
                                color: "var(--white, #ffffff)",
                                borderRadius: "100rem",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                display: "inline-flex",
                                alignItems: "center"
                              }}
                            >
                              {uploading ? "Uploading..." : "Upload New"}
                            </label>
                          </div>
                          {editForm.image && (
                            <div style={{ marginTop: "0.75rem", borderRadius: "18px", overflow: "hidden", width: "140px", height: "75px", position: "relative", border: "1px solid #e5e7eb" }}>
                              <Image src={editForm.image} alt="Preview" fill sizes="140px" style={{ objectFit: "cover" }} />
                            </div>
                          )}
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Article Body (Markdown)</label>
                          <textarea
                            rows={12}
                            value={editForm.content || ""}
                            onChange={(e) => updateEditForm({ ...editForm, content: e.target.value })}
                            style={{ width: "100%", padding: "1rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontFamily: "monospace", fontSize: "0.875rem", lineHeight: "1.55", boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "services" && (
                      <>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Title</label>
                          <input
                            type="text"
                            value={editForm.title || ""}
                            onChange={(e) => updateEditForm({ ...editForm, title: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Slug</label>
                          <input
                            type="text"
                            value={editForm.slug || ""}
                            onChange={(e) => updateEditForm({ ...editForm, slug: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Description</label>
                          <textarea
                            rows={3}
                            value={editForm.description || ""}
                            onChange={(e) => updateEditForm({ ...editForm, description: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Features (One per line)</label>
                          <textarea
                            rows={4}
                            value={(editForm.features || []).join("\n")}
                            onChange={(e) => updateEditForm({ ...editForm, features: e.target.value.split("\n").filter(Boolean) })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "site-config" && (
                      <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Agency Name</label>
                            <input
                              type="text"
                              value={editForm.name || ""}
                              onChange={(e) => updateEditForm({ ...editForm, name: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Email</label>
                            <input
                              type="text"
                              value={editForm.email || ""}
                              onChange={(e) => updateEditForm({ ...editForm, email: e.target.value })}
                              style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>Description</label>
                          <textarea
                            rows={3}
                            value={editForm.description || ""}
                            onChange={(e) => updateEditForm({ ...editForm, description: e.target.value })}
                            style={{ width: "100%", padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                          />
                        </div>
                      </>
                    )}

                    {activeTab === "team" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                        {/* Section Header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                          <div>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                              Team Members ({Array.isArray(editForm) ? editForm.length : 0})
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                              Manage profiles, roles, headshots/avatars, bios, and social links displayed across the site.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={addTeamMember}
                            style={{
                              backgroundColor: "var(--green, #cbfb45)",
                              color: "var(--black, #171717)",
                              border: "none",
                              borderRadius: "100rem",
                              padding: "0.55rem 1.25rem",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            + Add Team Member
                          </button>
                        </div>

                        {/* Team Member Cards */}
                        {Array.isArray(editForm) && editForm.map((member: { id: string; name: string; role: string; bio: string; image: string; socials?: { linkedin?: string; twitter?: string } }, index: number) => {
                          const isCurrentUploading = uploadingIndex === index;
                          return (
                            <div
                              key={member.id || index}
                              style={{
                                backgroundColor: "#fafafa",
                                border: "1px solid #e5e7eb",
                                borderRadius: "20px",
                                padding: "1.75rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1.25rem",
                              }}
                            >
                              {/* Member Card Header */}
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                                  <div style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    position: "relative",
                                    backgroundColor: "#e5e7eb",
                                    border: "2px solid #ffffff",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                                    flexShrink: 0
                                  }}>
                                    {member.image ? (
                                      <Image
                                        src={member.image}
                                        alt={member.name || "Member avatar"}
                                        fill
                                        sizes="44px"
                                        style={{ objectFit: "cover" }}
                                      />
                                    ) : (
                                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#6b7280" }}>
                                        {member.name ? member.name.charAt(0).toUpperCase() : "#"}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>
                                      {member.name || `Member #${index + 1}`}
                                      <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "#9ca3af", marginLeft: "0.5rem" }}>
                                        #{index + 1}
                                      </span>
                                    </div>
                                    <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
                                      {member.role || "No role specified"}
                                    </div>
                                  </div>
                                </div>

                                <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                                  <button
                                    type="button"
                                    onClick={() => moveTeamMember(index, "up")}
                                    disabled={index === 0}
                                    title="Move up"
                                    style={{
                                      backgroundColor: index === 0 ? "#f3f4f6" : "#ffffff",
                                      color: index === 0 ? "#9ca3af" : "#171717",
                                      border: "1px solid #e5e7eb",
                                      padding: "0.35rem 0.65rem",
                                      borderRadius: "8px",
                                      cursor: index === 0 ? "default" : "pointer",
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    ↑
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveTeamMember(index, "down")}
                                    disabled={index === editForm.length - 1}
                                    title="Move down"
                                    style={{
                                      backgroundColor: index === editForm.length - 1 ? "#f3f4f6" : "#ffffff",
                                      color: index === editForm.length - 1 ? "#9ca3af" : "#171717",
                                      border: "1px solid #e5e7eb",
                                      padding: "0.35rem 0.65rem",
                                      borderRadius: "8px",
                                      cursor: index === editForm.length - 1 ? "default" : "pointer",
                                      fontSize: "0.85rem",
                                    }}
                                  >
                                    ↓
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    style={{
                                      backgroundColor: "transparent",
                                      color: "#ef4444",
                                      border: "1px solid #fee2e2",
                                      borderRadius: "100rem",
                                      padding: "0.35rem 0.85rem",
                                      fontSize: "0.75rem",
                                      fontWeight: 600,
                                      cursor: "pointer",
                                      marginLeft: "0.25rem",
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              {/* Identity Grid: Name, Role, ID */}
                              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.2fr 0.8fr", gap: "1rem" }}>
                                <div>
                                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    value={member.name || ""}
                                    onChange={(e) => updateTeamMemberField(index, "name", e.target.value)}
                                    placeholder="e.g. Saqib Masoodi"
                                    style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                    Role / Title
                                  </label>
                                  <input
                                    type="text"
                                    value={member.role || ""}
                                    onChange={(e) => updateTeamMemberField(index, "role", e.target.value)}
                                    placeholder="e.g. Design Lead"
                                    style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                    Identifier (Slug ID)
                                  </label>
                                  <input
                                    type="text"
                                    value={member.id || ""}
                                    onChange={(e) => updateTeamMemberField(index, "id", e.target.value)}
                                    placeholder="e.g. saqib"
                                    style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }}
                                  />
                                </div>
                              </div>

                              {/* Avatar & Image Path */}
                              <div>
                                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                  Avatar / Headshot Image
                                </label>
                                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                                  <input
                                    type="text"
                                    value={member.image || ""}
                                    onChange={(e) => updateTeamMemberField(index, "image", e.target.value)}
                                    placeholder="/images/team/name.webp or /images/avatar.svg"
                                    style={{ flex: 1, padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.85rem", boxSizing: "border-box", outline: "none" }}
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id={`team-avatar-${index}`}
                                    onChange={(e) => handleTeamAvatarUpload(index, e)}
                                    style={{ display: "none" }}
                                  />
                                  <label
                                    htmlFor={`team-avatar-${index}`}
                                    style={{
                                      padding: "0.75rem 1.25rem",
                                      backgroundColor: "var(--black, #171717)",
                                      color: "var(--white, #ffffff)",
                                      borderRadius: "100rem",
                                      cursor: "pointer",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                      whiteSpace: "nowrap",
                                      display: "inline-flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {isCurrentUploading ? "Uploading..." : "Upload Avatar"}
                                  </label>
                                </div>
                              </div>

                              {/* Bio */}
                              <div>
                                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                  Biography / Expertise
                                </label>
                                <textarea
                                  rows={3}
                                  value={member.bio || ""}
                                  onChange={(e) => updateTeamMemberField(index, "bio", e.target.value)}
                                  placeholder="Write a concise overview of their focus areas, skills, and background..."
                                  style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.85rem", lineHeight: 1.5, boxSizing: "border-box", outline: "none" }}
                                />
                              </div>

                              {/* Social Links */}
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                    LinkedIn Profile URL
                                  </label>
                                  <input
                                    type="text"
                                    value={member.socials?.linkedin || ""}
                                    onChange={(e) => updateTeamMemberField(index, "socials.linkedin", e.target.value)}
                                    placeholder="https://www.linkedin.com/in/username"
                                    style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.85rem", boxSizing: "border-box", outline: "none" }}
                                  />
                                </div>
                                <div>
                                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                    X / Twitter Profile URL
                                  </label>
                                  <input
                                    type="text"
                                    value={member.socials?.twitter || ""}
                                    onChange={(e) => updateTeamMemberField(index, "socials.twitter", e.target.value)}
                                    placeholder="https://x.com/username"
                                    style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.85rem", boxSizing: "border-box", outline: "none" }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        {(!Array.isArray(editForm) || editForm.length === 0) && (
                          <div style={{ padding: "3rem", textAlign: "center", backgroundColor: "#ffffff", borderRadius: "20px", border: "1px dashed #d1d5db", color: "#6b7280" }}>
                            <p style={{ margin: 0, fontWeight: 500 }}>No team members found.</p>
                            <button
                              type="button"
                              onClick={addTeamMember}
                              style={{
                                marginTop: "1rem",
                                backgroundColor: "var(--green, #cbfb45)",
                                color: "var(--black, #171717)",
                                border: "none",
                                borderRadius: "100rem",
                                padding: "0.55rem 1.25rem",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              + Add First Team Member
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "testimonials" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                        {/* Featured Hero Image for Left Card */}
                        <div
                          style={{
                            backgroundColor: "#fafafa",
                            border: "1px solid #e5e7eb",
                            borderRadius: "20px",
                            padding: "1.5rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          <div>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                              Left Card Featured Hero Image
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                              The hero-style image displayed on the large left card of the redesigned testimonials section.
                            </p>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#374151", marginBottom: "0.45rem" }}>
                              Hero Image Path
                            </label>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                              <input
                                type="text"
                                value={editForm?.image || ""}
                                onChange={(e) => updateEditForm({ ...editForm, image: e.target.value })}
                                style={{ flex: 1, padding: "0.85rem 1.2rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", color: "#111827", fontSize: "0.95rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                              />
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                                id="testimonials-image-upload"
                              />
                              <label
                                htmlFor="testimonials-image-upload"
                                style={{
                                  padding: "0.85rem 1.5rem",
                                  backgroundColor: "var(--black, #171717)",
                                  color: "var(--white, #ffffff)",
                                  borderRadius: "100rem",
                                  cursor: "pointer",
                                  fontSize: "0.85rem",
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  display: "inline-flex",
                                  alignItems: "center"
                                }}
                              >
                                {uploading ? "Uploading..." : "Upload New"}
                              </label>
                            </div>
                            {editForm?.image && (
                              <div style={{ marginTop: "0.85rem", borderRadius: "18px", overflow: "hidden", width: "200px", height: "120px", position: "relative", border: "1px solid #e5e7eb" }}>
                                <Image src={editForm.image} alt="Testimonial Hero Preview" fill sizes="200px" style={{ objectFit: "cover" }} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Testimonials List */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                          <div>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                              Client Reviews & Testimonials
                            </h3>
                            <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0.25rem 0 0 0" }}>
                              Add, edit, or remove testimonials. The top 3 appear on the right side of the section.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const currentList = Array.isArray(editForm?.testimonials)
                                ? [...editForm.testimonials]
                                : Array.isArray(editForm)
                                ? [...editForm]
                                : [];
                              const newItem = {
                                id: `testimonial-${Date.now().toString().slice(-4)}`,
                                author: "New Client",
                                role: "Founder / Executive",
                                quote: "Working with this team transformed our brand and customer growth.",
                                rating: 5,
                              };
                              updateEditForm({
                                ...editForm,
                                testimonials: [...currentList, newItem],
                              });
                            }}
                            style={{
                              backgroundColor: "var(--green, #cbfb45)",
                              color: "var(--black, #171717)",
                              border: "none",
                              borderRadius: "100rem",
                              padding: "0.55rem 1.25rem",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            + Add Testimonial
                          </button>
                        </div>

                        {((Array.isArray(editForm?.testimonials) ? editForm.testimonials : Array.isArray(editForm) ? editForm : []) as Array<{ id: string; author: string; role: string; quote: string; rating: number }>).map((item, index: number) => (
                          <div
                            key={item.id || index}
                            style={{
                              backgroundColor: "#fafafa",
                              border: "1px solid #e5e7eb",
                              borderRadius: "20px",
                              padding: "1.5rem",
                              display: "flex",
                              flexDirection: "column",
                              gap: "1.25rem",
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>
                                Testimonial #{index + 1} {index < 3 && <span style={{ color: "#059669", fontWeight: 600, fontSize: "0.75rem" }}>(Live on Homepage)</span>}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentList = Array.isArray(editForm?.testimonials)
                                    ? [...editForm.testimonials]
                                    : Array.isArray(editForm)
                                    ? [...editForm]
                                    : [];
                                  currentList.splice(index, 1);
                                  updateEditForm({
                                    ...editForm,
                                    testimonials: currentList,
                                  });
                                }}
                                style={{
                                  backgroundColor: "transparent",
                                  color: "#ef4444",
                                  border: "1px solid #fee2e2",
                                  borderRadius: "100rem",
                                  padding: "0.3rem 0.85rem",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                }}
                              >
                                Remove
                              </button>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px", gap: "1rem" }}>
                              <div>
                                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                  Author Name
                                </label>
                                <input
                                  type="text"
                                  value={item.author || ""}
                                  onChange={(e) => {
                                    const currentList = Array.isArray(editForm?.testimonials)
                                      ? [...editForm.testimonials]
                                      : Array.isArray(editForm)
                                      ? [...editForm]
                                      : [];
                                    currentList[index] = { ...currentList[index], author: e.target.value };
                                    updateEditForm({
                                      ...editForm,
                                      testimonials: currentList,
                                    });
                                  }}
                                  style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                  Role / Position
                                </label>
                                <input
                                  type="text"
                                  value={item.role || ""}
                                  onChange={(e) => {
                                    const currentList = Array.isArray(editForm?.testimonials)
                                      ? [...editForm.testimonials]
                                      : Array.isArray(editForm)
                                      ? [...editForm]
                                      : [];
                                    currentList[index] = { ...currentList[index], role: e.target.value };
                                    updateEditForm({
                                      ...editForm,
                                      testimonials: currentList,
                                    });
                                  }}
                                  style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", boxSizing: "border-box", outline: "none" }}
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                  Rating (1-5)
                                </label>
                                <select
                                  value={item.rating ?? 5}
                                  onChange={(e) => {
                                    const currentList = Array.isArray(editForm?.testimonials)
                                      ? [...editForm.testimonials]
                                      : Array.isArray(editForm)
                                      ? [...editForm]
                                      : [];
                                    currentList[index] = { ...currentList[index], rating: Number(e.target.value) };
                                    updateEditForm({
                                      ...editForm,
                                      testimonials: currentList,
                                    });
                                  }}
                                  style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", fontWeight: 600, boxSizing: "border-box", outline: "none" }}
                                >
                                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                                  <option value={3}>⭐⭐⭐ (3)</option>
                                  <option value={2}>⭐⭐ (2)</option>
                                  <option value={1}>⭐ (1)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#4b5563", marginBottom: "0.35rem" }}>
                                Testimonial Quote
                              </label>
                              <textarea
                                rows={3}
                                value={item.quote || ""}
                                onChange={(e) => {
                                  const currentList = Array.isArray(editForm?.testimonials)
                                    ? [...editForm.testimonials]
                                    : Array.isArray(editForm)
                                    ? [...editForm]
                                    : [];
                                  currentList[index] = { ...currentList[index], quote: e.target.value };
                                  updateEditForm({
                                    ...editForm,
                                    testimonials: currentList,
                                  });
                                }}
                                style={{ width: "100%", padding: "0.75rem 1rem", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px", color: "#111827", fontSize: "0.9rem", lineHeight: 1.55, boxSizing: "border-box", outline: "none" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "#9ca3af", marginTop: "5rem", fontSize: "0.95rem" }}>
                  Select an item from the list to edit, or click + New.
                </div>
              )}
            </div>
        </main>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          backgroundColor: toast.type === "success" ? "#171717" : "#ef4444",
          color: "#ffffff",
          padding: "0.85rem 1.5rem",
          borderRadius: "100rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          fontSize: "0.875rem",
          fontWeight: 500,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}>
          {toast.type === "success" ? "✓" : "⚠"} {toast.message}
        </div>
      )}
    </div>
  );
}
