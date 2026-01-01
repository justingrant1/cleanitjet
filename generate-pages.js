const fs = require('fs');
const path = require('path');

// Read data
const airports = JSON.parse(fs.readFileSync('./data/airports.json', 'utf8'));
const aircraft = JSON.parse(fs.readFileSync('./data/aircraft.json', 'utf8'));

// Airport Page Template
function generateAirportPage(airport) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>Private Jet Detailing at ${airport.name} (${airport.code}) | CleanItJet</title>
    <meta name="title" content="Private Jet Detailing at ${airport.name} (${airport.code}) | CleanItJet">
    <meta name="description" content="Professional private jet and aircraft detailing services at ${airport.name} (${airport.code}) in ${airport.city}, ${airport.state}. On-demand booking, elite crews, $5M insurance. Serving ${airport.metroArea}.">
    <meta name="keywords" content="${airport.code} aircraft detailing, ${airport.code} jet cleaning, ${airport.city} private jet detailing, ${airport.name} detailing service, ${airport.metroArea} aviation cleaning">
    <link rel="canonical" href="https://cleanitjet.vercel.app/airports/${airport.code.toLowerCase()}.html">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://cleanitjet.vercel.app/airports/${airport.code.toLowerCase()}.html">
    <meta property="og:title" content="Private Jet Detailing at ${airport.name} (${airport.code})">
    <meta property="og:description" content="Professional aircraft detailing at ${airport.name}. On-demand service, elite crews, instant booking.">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white text-zinc-600">

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <a href="/" class="text-xl font-semibold tracking-tighter text-zinc-900 flex items-center gap-2">
                <span class="iconify text-zinc-900" data-icon="lucide:plane" data-width="20"></span>
                CleanItJet
            </a>
            <a href="/#book" class="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                Book Now
            </a>
        </div>
    </nav>

    <!-- Hero -->
    <main class="pt-32 pb-16">
        <div class="mx-auto max-w-4xl px-6">
            <div class="mb-6">
                <a href="/" class="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:arrow-left" data-width="14"></span>
                    Back to Home
                </a>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">
                Private Jet Detailing at ${airport.name}
            </h1>
            
            <div class="flex flex-wrap gap-4 text-sm text-zinc-600 mb-8">
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:map-pin" data-width="14"></span>
                    ${airport.city}, ${airport.stateCode}
                </span>
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:plane" data-width="14"></span>
                    Airport Code: ${airport.code}
                </span>
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:building" data-width="14"></span>
                    ${airport.fbos.length} FBOs
                </span>
            </div>
            
            <p class="text-lg text-zinc-600 leading-relaxed mb-8">
                ${airport.description}
            </p>

            <!-- Services -->
            <section class="my-12 grid md:grid-cols-3 gap-4">
                <div class="rounded-xl border border-zinc-200 bg-white p-6">
                    <h3 class="font-medium text-zinc-900 mb-2">The Turnaround</h3>
                    <p class="text-2xl font-semibold text-zinc-900 mb-2">From $950</p>
                    <p class="text-sm text-zinc-500">Quick service for light jets</p>
                </div>
                <div class="rounded-xl border border-zinc-200 bg-white p-6">
                    <h3 class="font-medium text-zinc-900 mb-2">The Layover</h3>
                    <p class="text-2xl font-semibold text-zinc-900 mb-2">From $1,800</p>
                    <p class="text-sm text-zinc-500">Deep interior cleaning</p>
                </div>
                <div class="rounded-xl border border-zinc-200 bg-white p-6">
                    <h3 class="font-medium text-zinc-900 mb-2">Red Carpet</h3>
                    <p class="text-2xl font-semibold text-zinc-900 mb-2">From $4,500</p>
                    <p class="text-sm text-zinc-500">Premium full service</p>
                </div>
            </section>

            <!-- FBOs -->
            <section class="my-12">
                <h2 class="text-2xl font-medium text-zinc-900 mb-4">Servicing FBOs at ${airport.code}</h2>
                <div class="grid md:grid-cols-2 gap-3">
                    ${airport.fbos.map(fbo => `
                    <div class="rounded-lg border border-zinc-200 bg-zinc-50 p-4 flex items-center gap-3">
                        <span class="iconify text-zinc-400" data-icon="lucide:check-circle" data-width="20"></span>
                        <span class="text-zinc-900">${fbo}</span>
                    </div>
                    `).join('')}
                </div>
            </section>

            <!-- CTA -->
            <section class="my-12 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-8 text-white text-center">
                <h2 class="text-2xl font-medium mb-4">Ready to Book at ${airport.code}?</h2>
                <p class="text-zinc-300 mb-6">Elite detailing crews standing by. Book in 2 minutes.</p>
                <a href="/#book" class="inline-block rounded-lg bg-white px-8 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
                    Book Service Now
                </a>
            </section>

            <!-- Nearby Airports -->
            <section class="my-12">
                <h3 class="text-xl font-medium text-zinc-900 mb-4">Also Serving Nearby</h3>
                <div class="flex flex-wrap gap-2">
                    ${airport.nearby.map(code => `
                    <span class="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700">
                        ${code}
                    </span>
                    `).join('')}
                </div>
            </section>
        </div>
    </main>

    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "CleanItJet - ${airport.name}",
      "description": "Professional private jet detailing at ${airport.name}",
      "url": "https://cleanitjet.vercel.app/airports/${airport.code.toLowerCase()}.html",
      "areaServed": {
        "@type": "City",
        "name": "${airport.city}",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "${airport.stateCode}"
        }
      }
    }
    </script>

</body>
</html>`;
}

// Aircraft Page Template
function generateAircraftPage(jet) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>${jet.fullName} Detailing Services | CleanItJet</title>
    <meta name="title" content="${jet.fullName} Detailing Services | CleanItJet">
    <meta name="description" content="Professional ${jet.fullName} aircraft detailing and cleaning services. Specialized care for ${jet.category} aircraft. On-demand booking at major private aviation airports.">
    <meta name="keywords" content="${jet.fullName} detailing, ${jet.model} cleaning, ${jet.manufacturer} detailing service, ${jet.category} aircraft cleaning">
    <link rel="canonical" href="https://cleanitjet.vercel.app/aircraft/${jet.slug}.html">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white text-zinc-600">

    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <a href="/" class="text-xl font-semibold tracking-tighter text-zinc-900 flex items-center gap-2">
                <span class="iconify text-zinc-900" data-icon="lucide:plane" data-width="20"></span>
                CleanItJet
            </a>
            <a href="/#book" class="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
                Book Now
            </a>
        </div>
    </nav>

    <!-- Hero -->
    <main class="pt-32 pb-16">
        <div class="mx-auto max-w-4xl px-6">
            <div class="mb-6">
                <a href="/" class="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:arrow-left" data-width="14"></span>
                    Back to Home
                </a>
            </div>
            
            <div class="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 mb-4">
                ${jet.category}
            </div>
            
            <h1 class="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 mb-4">
                ${jet.fullName} Detailing
            </h1>
            
            <div class="flex flex-wrap gap-4 text-sm text-zinc-600 mb-8">
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:users" data-width="14"></span>
                    ${jet.seats} Seats
                </span>
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:gauge" data-width="14"></span>
                    ${jet.range} Range
                </span>
                <span class="flex items-center gap-1">
                    <span class="iconify" data-icon="lucide:clock" data-width="14"></span>
                    ${jet.avgDetailTime}
                </span>
            </div>
            
            <p class="text-lg text-zinc-600 leading-relaxed mb-8">
                ${jet.description}
            </p>

            <!-- Recommended Service -->
            <section class="my-12 rounded-xl border-2 border-zinc-900 bg-zinc-50 p-8">
                <div class="flex items-start gap-4">
                    <span class="iconify text-zinc-900" data-icon="lucide:star" data-width="32"></span>
                    <div>
                        <h2 class="text-xl font-medium text-zinc-900 mb-2">Recommended Service: ${jet.recommendedService}</h2>
                        <p class="text-zinc-600">${jet.detailingNotes}</p>
                    </div>
                </div>
            </section>

            <!-- Interior Features -->
            <section class="my-12">
                <h2 class="text-2xl font-medium text-zinc-900 mb-4">Interior Features</h2>
                <div class="grid md:grid-cols-2 gap-3">
                    ${jet.interiorFeatures.map(feature => `
                    <div class="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-4">
                        <span class="iconify text-zinc-400" data-icon="lucide:check-circle" data-width="20"></span>
                        <span class="text-zinc-900">${feature}</span>
                    </div>
                    `).join('')}
                </div>
            </section>

            <!-- CTA -->
            <section class="my-12 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-8 text-white text-center">
                <h2 class="text-2xl font-medium mb-4">Book ${jet.model} Detailing</h2>
                <p class="text-zinc-300 mb-6">Professional care for your ${jet.manufacturer} ${jet.model}. Elite crews at major airports.</p>
                <a href="/#book" class="inline-block rounded-lg bg-white px-8 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100">
                    Book Service Now
                </a>
            </section>
        </div>
    </main>

    <!-- Schema.org -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Aircraft Detailing",
      "name": "${jet.fullName} Detailing Service",
      "description": "Professional detailing service for ${jet.fullName} aircraft",
      "provider": {
        "@type": "LocalBusiness",
        "name": "CleanItJet"
      }
    }
    </script>

</body>
</html>`;
}

// Generate all pages
console.log('Generating airport pages...');
airports.forEach(airport => {
  const html = generateAirportPage(airport);
  const filename = `./airports/${airport.code.toLowerCase()}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✓ Generated ${filename}`);
});

console.log('\nGenerating aircraft pages...');
aircraft.forEach(jet => {
  const html = generateAircraftPage(jet);
  const filename = `./aircraft/${jet.slug}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✓ Generated ${filename}`);
});

console.log('\n✅ All pages generated successfully!');
console.log(`📄 Total: ${airports.length} airport pages + ${aircraft.length} aircraft pages = ${airports.length + aircraft.length} pages`);
