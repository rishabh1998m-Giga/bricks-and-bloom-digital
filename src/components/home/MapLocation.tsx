import { ClientOnly } from "@tanstack/react-router";

const MAP_API_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
const PLACE_ID = "ChIJU56mPgAVrjsRqHRfirgaLP8";

export function MapLocation() {
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=place_id:${PLACE_ID}&zoom=15`;

  return (
    <section aria-label="Studio location" className="w-full">
      <ClientOnly fallback={<div className="h-[50vh] w-full bg-muted animate-pulse" aria-hidden />}>
        <iframe
          title="Brick & Blooms studio location"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[50vh] w-full bg-muted md:h-[55vh] lg:h-[60vh]"
        />
      </ClientOnly>
    </section>
  );
}
