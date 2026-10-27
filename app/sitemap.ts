import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/care";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...Object.keys(services).map((slug) => ({ url: `${site.url}/care/${slug}` })),
    { url: `${site.url}/privacy` },
  ];
}
