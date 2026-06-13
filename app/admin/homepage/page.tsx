"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import ImageUploader from "@/components/admin/ImageUploader";
import { uploadFile } from "@/lib/api-client";

interface Section {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  image_width?: number;
  image_height?: number;
  image_position?: "left" | "center" | "right";
  button_text?: string;
  button_link?: string;
  content_type: "text" | "featured_research" | "featured_publications";
  order_index: number;
  visible: boolean;
}

export default function HomepageEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [homepageId, setHomepageId] = useState<string | null>(null);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { getHomepageContent } = await import("@/lib/actions");
      const data = await getHomepageContent();
      if (data) {
        setHomepageId(data.id);
        setHeroTitle(data.hero_title);
        setHeroDescription(data.hero_description);
        setHeroImageUrl(data.hero_image_url || "");
        setSections(data.sections || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load homepage content.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleImageUpload = async (file: File) => {
    const url = await uploadFile(file);
    setHeroImageUrl(url);
  };

  const handleSectionImageUpload = async (sectionId: string, file: File) => {
    const url = await uploadFile(file);
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, image_url: url } : s))
    );
  };

  const addSection = () => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      content_type: "text",
      order_index: sections.length,
      visible: true,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { saveHomepageContent } = await import("@/lib/actions");
      await saveHomepageContent(homepageId, {
        hero_title: heroTitle,
        hero_description: heroDescription,
        hero_image_url: heroImageUrl || undefined,
        sections,
      });
      router.refresh();
      alert("Homepage saved successfully!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save homepage.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Homepage Editor
      </h1>
      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hero Section
          </h2>
          <div className="space-y-4">
            <Input
              label="Hero Title"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
            <TextArea
              label="Hero Description"
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
            />
            <ImageUploader onUpload={handleImageUpload} label="Hero Background Image" />
            {heroImageUrl && (
              <div className="mt-2">
                <img src={heroImageUrl} alt="" className="h-32 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => setHeroImageUrl("")}
                  className="mt-1 text-xs text-red-600 hover:text-red-800"
                >
                  Remove image
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Page Sections
            </h2>
            <Button type="button" variant="outline" size="sm" onClick={addSection}>
              + Add Section
            </Button>
          </div>

          {sections.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">
              No sections added yet. Click "Add Section" to create one.
            </p>
          )}

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Section {idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1 text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={section.visible}
                        onChange={(e) =>
                          updateSection(section.id, "visible", e.target.checked)
                        }
                      />
                      Visible
                    </label>
                    <button
                      type="button"
                      onClick={() => removeSection(section.id)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Input
                    label="Section Title"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(section.id, "title", e.target.value)
                    }
                  />
                  <TextArea
                    label="Description"
                    value={section.description}
                    onChange={(e) =>
                      updateSection(section.id, "description", e.target.value)
                    }
                  />

                  {/* Section Image */}
                  <ImageUploader
                    onUpload={(file) => handleSectionImageUpload(section.id, file)}
                    label="Section Image"
                  />
                  {section.image_url && (
                    <div className="mt-2 space-y-2 border border-gray-100 dark:border-gray-700 rounded-lg p-3">
                      <img src={section.image_url} alt="" className="h-24 rounded-lg object-cover" />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          label="Width (px)"
                          type="number"
                          value={section.image_width || ""}
                          onChange={(e) =>
                            updateSection(section.id, "image_width", parseInt(e.target.value) || undefined)
                          }
                        />
                        <Input
                          label="Height (px)"
                          type="number"
                          value={section.image_height || ""}
                          onChange={(e) =>
                            updateSection(section.id, "image_height", parseInt(e.target.value) || undefined)
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Alignment
                        </label>
                        <select
                          value={section.image_position || "center"}
                          onChange={(e) =>
                            updateSection(section.id, "image_position", e.target.value)
                          }
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                        >
                          <option value="left">Left</option>
                          <option value="center">Center</option>
                          <option value="right">Right</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          updateSection(section.id, "image_url", undefined)
                        }
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove image
                      </button>
                    </div>
                  )}

                  {/* Button fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Button Text"
                      value={section.button_text || ""}
                      onChange={(e) =>
                        updateSection(section.id, "button_text", e.target.value)
                      }
                    />
                    <Input
                      label="Button Link"
                      value={section.button_link || ""}
                      onChange={(e) =>
                        updateSection(section.id, "button_link", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Content Type
                    </label>
                    <select
                      value={section.content_type}
                      onChange={(e) =>
                        updateSection(section.id, "content_type", e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    >
                      <option value="text">Text Block</option>
                      <option value="featured_research">Featured Research</option>
                      <option value="featured_publications">Featured Publications</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Homepage"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
