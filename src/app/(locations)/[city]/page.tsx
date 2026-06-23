import { notFound } from "next/navigation";
import LocationCityPage from "@/components/location/LocationCityPage";
import {
  getLocationPageProfile,
  locationPageSlugs,
} from "@/lib/location-page-data";

type CityRouteParams = {
  city: string;
};

export function generateStaticParams() {
  return locationPageSlugs.map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<CityRouteParams> }) {
  const { city } = await params;
  const profile = getLocationPageProfile(city);

  if (!profile) {
    return {};
  }

  return {
    title: `Immigration Consultants Serving ${profile.city} - ZF Canada`,
    description: `ZF Canada provides immigration consulting services for clients in ${profile.city}, Ontario, including permanent residence, temporary residence, sponsorship, study permits, work permits, and more.`,
  };
}

export default async function CityLocationPage({ params }: { params: Promise<CityRouteParams> }) {
  const { city } = await params;
  const profile = getLocationPageProfile(city);

  if (!profile) {
    notFound();
  }

  return <LocationCityPage profile={profile} />;
}

export const dynamicParams = false;
