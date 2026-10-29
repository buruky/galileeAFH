// Single source for contact facts. Empty strings are unknown and stay hidden on the page.
export const site = {
  name: "Galilee Adult Family Home",
  url: "https://galileeafh.net",
  licenseNumber: "", // WA DSHS AFH license, waiting on the client
  address: {
    street: "22906 41st Pl W",
    city: "Mountlake Terrace",
    region: "WA",
    postal: "98043",
  },
  phones: {
    office: "425-678-6584",
    cell: "206-883-3743",
    text: "425-412-6484",
    fax: "425-361-1949",
  },
  emails: ["galileeafh@gmail.com", "galileecare@galileeafh.net"],
};

export const tel = (n: string) => `tel:+1${n.replace(/\D/g, "")}`;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
