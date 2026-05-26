export type CountryDatum = {
  country: string;
  value: number;
};

export type TrendDatum = {
  period: string;
  value: number;
};

export type LocationPageProfile = {
  slug: string;
  city: string;
  regionLabel: string;
  population: number;
  immigrants: number;
  recentImmigrants: number;
  countries: CountryDatum[];
  trends: TrendDatum[];
};

type LocationSeed = {
  slug: string;
  city: string;
  regionLabel?: string;
  population: number;
  immigrants: number;
  recentImmigrants: number;
  countries: Array<[string, number]>;
  trendShares?: [number, number, number, number, number, number, number];
};

const periods = [
  "Before 1980",
  "1980 to 1990",
  "1991 to 2000",
  "2001 to 2005",
  "2006 to 2010",
  "2011 to 2015",
  "2016 to 2021",
];

const defaultTrendShares: [number, number, number, number, number, number, number] = [
  0.18, 0.13, 0.2, 0.12, 0.11, 0.11, 0.15,
];

function roundToFive(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function buildProfile(seed: LocationSeed): LocationPageProfile {
  const trendShares = seed.trendShares ?? defaultTrendShares;

  return {
    slug: seed.slug,
    city: seed.city,
    regionLabel: seed.regionLabel ?? `${seed.city}, Ontario`,
    population: seed.population,
    immigrants: seed.immigrants,
    recentImmigrants: seed.recentImmigrants,
    countries: seed.countries.map(([country, share]) => ({
      country,
      value: roundToFive(seed.immigrants * share),
    })),
    trends: periods.map((period, index) => ({
      period,
      value: roundToFive(seed.immigrants * trendShares[index]),
    })),
  };
}

const seeds: LocationSeed[] = [
  {
    slug: "toronto",
    city: "Toronto",
    population: 2794356,
    immigrants: 1286145,
    recentImmigrants: 198045,
    countries: [["India", 0.14], ["China", 0.12], ["Philippines", 0.1], ["Jamaica", 0.05], ["Sri Lanka", 0.045], ["Iran", 0.04], ["Pakistan", 0.04], ["Bangladesh", 0.035]],
    trendShares: [0.173, 0.122, 0.213, 0.114, 0.112, 0.112, 0.154],
  },
  {
    slug: "ottawa",
    city: "Ottawa",
    population: 1017449,
    immigrants: 259215,
    recentImmigrants: 44395,
    countries: [["China", 0.11], ["India", 0.1], ["Philippines", 0.075], ["Lebanon", 0.06], ["United Kingdom", 0.05], ["Iran", 0.045], ["Syria", 0.04], ["Haiti", 0.035]],
  },
  {
    slug: "mississauga",
    city: "Mississauga",
    population: 717961,
    immigrants: 382470,
    recentImmigrants: 51515,
    countries: [["India", 0.19], ["Pakistan", 0.1], ["Philippines", 0.08], ["China", 0.07], ["Sri Lanka", 0.055], ["Poland", 0.045], ["Jamaica", 0.04], ["Iran", 0.035]],
  },
  {
    slug: "brampton",
    city: "Brampton",
    population: 656480,
    immigrants: 343500,
    recentImmigrants: 64500,
    countries: [["India", 0.36], ["Pakistan", 0.08], ["Jamaica", 0.055], ["Philippines", 0.045], ["Sri Lanka", 0.04], ["Guyana", 0.035], ["Nigeria", 0.03], ["China", 0.025]],
  },
  {
    slug: "vaughan",
    city: "Vaughan",
    population: 323103,
    immigrants: 154235,
    recentImmigrants: 17150,
    countries: [["Italy", 0.18], ["India", 0.09], ["China", 0.075], ["Russia", 0.06], ["Philippines", 0.05], ["Iran", 0.045], ["Pakistan", 0.035], ["Ukraine", 0.03]],
    trendShares: [0.25, 0.16, 0.2, 0.1, 0.09, 0.09, 0.11],
  },
  {
    slug: "richmond-hill",
    city: "Richmond Hill",
    population: 202022,
    immigrants: 118050,
    recentImmigrants: 18750,
    countries: [["China", 0.31], ["Iran", 0.14], ["Hong Kong", 0.09], ["India", 0.065], ["Russia", 0.04], ["Philippines", 0.035], ["South Korea", 0.03], ["Pakistan", 0.025]],
  },
  {
    slug: "markham",
    city: "Markham",
    population: 338503,
    immigrants: 198350,
    recentImmigrants: 27900,
    countries: [["China", 0.27], ["Hong Kong", 0.13], ["India", 0.095], ["Sri Lanka", 0.065], ["Philippines", 0.045], ["Iran", 0.035], ["Pakistan", 0.03], ["Vietnam", 0.025]],
  },
  {
    slug: "barrie",
    city: "Barrie",
    population: 147829,
    immigrants: 18490,
    recentImmigrants: 2740,
    countries: [["United Kingdom", 0.14], ["India", 0.1], ["Philippines", 0.085], ["China", 0.06], ["Jamaica", 0.045], ["Pakistan", 0.04], ["United States", 0.035], ["Syria", 0.03]],
  },
  {
    slug: "hamilton",
    city: "Hamilton",
    population: 569353,
    immigrants: 151760,
    recentImmigrants: 19270,
    countries: [["India", 0.105], ["Philippines", 0.075], ["China", 0.06], ["United Kingdom", 0.055], ["Italy", 0.05], ["Pakistan", 0.045], ["Syria", 0.035], ["Poland", 0.03]],
  },
  {
    slug: "oakville",
    city: "Oakville",
    population: 213759,
    immigrants: 78850,
    recentImmigrants: 11950,
    countries: [["India", 0.12], ["China", 0.1], ["United Kingdom", 0.085], ["Pakistan", 0.055], ["Philippines", 0.05], ["Iran", 0.045], ["United States", 0.04], ["Egypt", 0.03]],
  },
  {
    slug: "burlington",
    city: "Burlington",
    population: 186948,
    immigrants: 46235,
    recentImmigrants: 5550,
    countries: [["United Kingdom", 0.18], ["India", 0.085], ["China", 0.06], ["Philippines", 0.055], ["United States", 0.045], ["Italy", 0.04], ["Pakistan", 0.035], ["Poland", 0.03]],
  },
  {
    slug: "guelph",
    city: "Guelph",
    population: 143740,
    immigrants: 30670,
    recentImmigrants: 4890,
    countries: [["India", 0.12], ["China", 0.08], ["Philippines", 0.065], ["United Kingdom", 0.06], ["Syria", 0.05], ["United States", 0.04], ["Pakistan", 0.035], ["Iran", 0.03]],
  },
  {
    slug: "kitchener",
    city: "Kitchener",
    population: 256885,
    immigrants: 70450,
    recentImmigrants: 16020,
    countries: [["India", 0.16], ["China", 0.07], ["Philippines", 0.065], ["Syria", 0.055], ["Pakistan", 0.05], ["Serbia", 0.04], ["United Kingdom", 0.035], ["Iran", 0.03]],
  },
  {
    slug: "cambridge",
    city: "Cambridge",
    population: 138479,
    immigrants: 37820,
    recentImmigrants: 6425,
    countries: [["India", 0.16], ["Philippines", 0.075], ["United Kingdom", 0.07], ["Pakistan", 0.055], ["China", 0.045], ["Portugal", 0.04], ["Jamaica", 0.035], ["Syria", 0.03]],
  },
  {
    slug: "london",
    city: "London",
    population: 422324,
    immigrants: 96620,
    recentImmigrants: 20655,
    countries: [["India", 0.12], ["China", 0.075], ["Syria", 0.065], ["Philippines", 0.06], ["United Kingdom", 0.055], ["Colombia", 0.04], ["Pakistan", 0.035], ["Iraq", 0.03]],
  },
  {
    slug: "scarborough",
    city: "Scarborough",
    regionLabel: "Scarborough, Toronto",
    population: 629941,
    immigrants: 360000,
    recentImmigrants: 49750,
    countries: [["China", 0.16], ["Sri Lanka", 0.13], ["India", 0.11], ["Philippines", 0.09], ["Pakistan", 0.055], ["Jamaica", 0.04], ["Bangladesh", 0.035], ["Guyana", 0.03]],
  },
  {
    slug: "etobicoke",
    city: "Etobicoke",
    regionLabel: "Etobicoke, Toronto",
    population: 365143,
    immigrants: 190000,
    recentImmigrants: 23800,
    countries: [["India", 0.12], ["Poland", 0.085], ["Philippines", 0.075], ["Ukraine", 0.055], ["Italy", 0.05], ["Jamaica", 0.045], ["China", 0.04], ["Pakistan", 0.035]],
  },
  {
    slug: "pickering",
    city: "Pickering",
    population: 99186,
    immigrants: 40750,
    recentImmigrants: 6400,
    countries: [["India", 0.15], ["Sri Lanka", 0.095], ["Philippines", 0.08], ["Jamaica", 0.065], ["China", 0.055], ["Pakistan", 0.045], ["Guyana", 0.04], ["Nigeria", 0.035]],
  },
  {
    slug: "ajax",
    city: "Ajax",
    population: 126666,
    immigrants: 54050,
    recentImmigrants: 9650,
    countries: [["India", 0.17], ["Sri Lanka", 0.08], ["Philippines", 0.075], ["Jamaica", 0.07], ["Pakistan", 0.055], ["Guyana", 0.045], ["Nigeria", 0.04], ["China", 0.035]],
  },
  {
    slug: "whitby",
    city: "Whitby",
    population: 138501,
    immigrants: 40210,
    recentImmigrants: 6550,
    countries: [["India", 0.14], ["United Kingdom", 0.08], ["Philippines", 0.07], ["Jamaica", 0.055], ["China", 0.05], ["Pakistan", 0.045], ["Sri Lanka", 0.04], ["Nigeria", 0.035]],
  },
  {
    slug: "oshawa",
    city: "Oshawa",
    population: 175383,
    immigrants: 30380,
    recentImmigrants: 5200,
    countries: [["United Kingdom", 0.13], ["India", 0.12], ["Philippines", 0.075], ["China", 0.055], ["Jamaica", 0.045], ["Pakistan", 0.04], ["United States", 0.035], ["Syria", 0.03]],
  },
  {
    slug: "kingston",
    city: "Kingston",
    population: 132485,
    immigrants: 18670,
    recentImmigrants: 2825,
    countries: [["United Kingdom", 0.12], ["China", 0.09], ["India", 0.085], ["United States", 0.075], ["Philippines", 0.055], ["Syria", 0.04], ["Iran", 0.035], ["France", 0.03]],
  },
  {
    slug: "st-catherines",
    city: "St. Catharines",
    population: 136803,
    immigrants: 27240,
    recentImmigrants: 3600,
    countries: [["United Kingdom", 0.14], ["Italy", 0.09], ["India", 0.075], ["China", 0.055], ["Philippines", 0.05], ["United States", 0.045], ["Poland", 0.035], ["Syria", 0.03]],
  },
  {
    slug: "windsor",
    city: "Windsor",
    population: 229660,
    immigrants: 74020,
    recentImmigrants: 14350,
    countries: [["India", 0.14], ["Iraq", 0.08], ["Lebanon", 0.07], ["Philippines", 0.055], ["China", 0.05], ["Syria", 0.045], ["United States", 0.04], ["Pakistan", 0.035]],
  },
];

export const locationPageProfiles = seeds.map(buildProfile);

export const locationPageSlugs = locationPageProfiles.map((profile) => profile.slug);

export function getLocationPageProfile(slug: string) {
  return locationPageProfiles.find((profile) => profile.slug === slug);
}
