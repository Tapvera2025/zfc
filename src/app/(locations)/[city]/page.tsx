import { notFound } from "next/navigation";
import LocationCityPage from "@/components/location/LocationCityPage";
import {
  getLocationPageProfile,
  locationPageSlugs,
} from "@/lib/location-page-data";

export function generateStaticParams() {
  return locationPageSlugs.map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }) {
  const profile = getLocationPageProfile(params.city);

  if (!profile) {
    return {};
  }

  return {
    title: `Immigration Consultants Serving ${profile.city} - ZF Canada`,
    description: `ZF Canada provides immigration consulting services for clients in ${profile.city}, Ontario, including permanent residence, temporary residence, sponsorship, study permits, work permits, and more.`,
  };
}

export default function CityLocationPage({ params }: { params: { city: string } }) {
  const profile = getLocationPageProfile(params.city);

  if (!profile) {
    notFound();
  }

  return <LocationCityPage profile={profile} />;
}

export const dynamicParams = false;
