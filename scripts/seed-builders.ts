import { getPayload } from 'payload'
import config from '../src/payload.config'

const builderSpecialties = [
  { title: 'AI Art', slug: 'ai-art', description: 'Generative art and visual creation using AI' },
  { title: 'Music Production', slug: 'music-production', description: 'AI-powered music and audio creation' },
  { title: 'Video Creation', slug: 'video-creation', description: 'AI video generation and editing' },
  { title: '3D Design', slug: '3d-design', description: 'AI-assisted 3D modeling and rendering' },
  { title: 'Writing & Content', slug: 'writing-content', description: 'AI writing, copywriting, and content creation' },
  { title: 'Game Development', slug: 'game-development', description: 'AI tools for game design and development' },
  { title: 'Photography', slug: 'photography', description: 'AI-enhanced photography and editing' },
  { title: 'Animation', slug: 'animation', description: 'AI-powered animation and motion graphics' },
]

const builders = [
  {
    title: 'Sarah Chen',
    slug: 'sarah-chen',
    bio: 'Digital artist and AI art pioneer. Creator of the "Synthetic Dreams" collection that has been exhibited in galleries worldwide. Specializing in combining traditional art techniques with cutting-edge AI image generation.',
    location: 'San Francisco, USA',
    experienceLevel: 'expert',
    availability: 'selective',
    website: 'https://sarahchen.art',
    featured: true,
    featuredPosition: 1,
    specialtySlugs: ['ai-art', 'photography'],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/sarahchenart' },
      { platform: 'instagram', url: 'https://instagram.com/sarahchenart' },
    ],
  },
  {
    title: 'Marcus Williams',
    slug: 'marcus-williams',
    bio: 'Music producer and sound designer pushing the boundaries of AI-generated music. Has worked with major labels to integrate AI tools into professional music production workflows.',
    location: 'Los Angeles, USA',
    experienceLevel: 'advanced',
    availability: 'available',
    website: 'https://marcuswilliams.studio',
    featured: true,
    featuredPosition: 2,
    specialtySlugs: ['music-production'],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/marcuswmusic' },
      { platform: 'youtube', url: 'https://youtube.com/@marcuswilliamsmusic' },
    ],
  },
  {
    title: 'Yuki Tanaka',
    slug: 'yuki-tanaka',
    bio: 'Award-winning animator and motion graphics artist. Combines traditional Japanese animation principles with AI-powered tools to create stunning visual narratives.',
    location: 'Tokyo, Japan',
    experienceLevel: 'expert',
    availability: 'selective',
    website: 'https://yukitanaka.jp',
    featured: true,
    featuredPosition: 3,
    specialtySlugs: ['animation', 'video-creation'],
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/yukitanaka_art' },
      { platform: 'behance', url: 'https://behance.net/yukitanaka' },
    ],
  },
  {
    title: 'Alex Rodriguez',
    slug: 'alex-rodriguez',
    bio: 'Game developer and 3D artist creating immersive worlds using AI tools. Founder of Nebula Studios, specializing in indie game development with AI-generated assets.',
    location: 'Barcelona, Spain',
    experienceLevel: 'advanced',
    availability: 'open-source-only',
    website: 'https://nebulastudios.dev',
    featured: false,
    specialtySlugs: ['game-development', '3d-design'],
    socialLinks: [
      { platform: 'github', url: 'https://github.com/alexrodriguez' },
      { platform: 'twitter', url: 'https://twitter.com/alexr_gamedev' },
    ],
  },
  {
    title: 'Emma Thompson',
    slug: 'emma-thompson',
    bio: 'Content creator and AI writing specialist. Helps brands and individuals harness the power of AI for compelling storytelling and content strategy.',
    location: 'London, UK',
    experienceLevel: 'advanced',
    availability: 'available',
    website: 'https://emmathompson.co',
    featured: true,
    featuredPosition: 4,
    specialtySlugs: ['writing-content'],
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/emmathompsonai' },
      { platform: 'twitter', url: 'https://twitter.com/emmatwrites' },
    ],
  },
  {
    title: 'David Kim',
    slug: 'david-kim',
    bio: 'Photographer and visual artist exploring the intersection of AI and documentary photography. His work challenges perceptions of authenticity in the age of AI.',
    location: 'Seoul, South Korea',
    experienceLevel: 'intermediate',
    availability: 'available',
    website: 'https://davidkim.photo',
    featured: false,
    specialtySlugs: ['photography', 'ai-art'],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/davidkimphoto' },
    ],
  },
  {
    title: 'Nina Patel',
    slug: 'nina-patel',
    bio: 'Video producer and filmmaker specializing in AI-enhanced documentaries. Uses generative AI to visualize complex scientific concepts and historical events.',
    location: 'Mumbai, India',
    experienceLevel: 'advanced',
    availability: 'selective',
    website: 'https://ninapatelfilms.com',
    featured: true,
    featuredPosition: 5,
    specialtySlugs: ['video-creation'],
    socialLinks: [
      { platform: 'youtube', url: 'https://youtube.com/@ninapatelfilms' },
      { platform: 'twitter', url: 'https://twitter.com/ninapatelfilms' },
    ],
  },
  {
    title: 'Lucas Berg',
    slug: 'lucas-berg',
    bio: 'Industrial designer and 3D artist using AI to prototype and visualize products faster than ever. Consults for major tech companies on AI-integrated design workflows.',
    location: 'Berlin, Germany',
    experienceLevel: 'expert',
    availability: 'unavailable',
    website: 'https://lucasberg.design',
    featured: false,
    specialtySlugs: ['3d-design'],
    socialLinks: [
      { platform: 'dribbble', url: 'https://dribbble.com/lucasberg' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/lucasbergdesign' },
    ],
  },
  {
    title: 'Olivia Martinez',
    slug: 'olivia-martinez',
    bio: 'Electronic music producer and sound designer creating experimental soundscapes with AI. Her album "Neural Frequencies" topped independent electronic charts.',
    location: 'Austin, USA',
    experienceLevel: 'intermediate',
    availability: 'available',
    website: 'https://oliviamart.audio',
    featured: false,
    specialtySlugs: ['music-production'],
    socialLinks: [
      { platform: 'instagram', url: 'https://instagram.com/oliviamartaudio' },
      { platform: 'youtube', url: 'https://youtube.com/@oliviamartinez' },
    ],
  },
  {
    title: 'James Wilson',
    slug: 'james-wilson',
    bio: 'Motion graphics artist and animator creating viral content for major brands. Specializes in combining AI animation tools with traditional motion design principles.',
    location: 'Toronto, Canada',
    experienceLevel: 'advanced',
    availability: 'available',
    website: 'https://jameswilsonmotion.com',
    featured: true,
    featuredPosition: 6,
    specialtySlugs: ['animation', 'video-creation'],
    socialLinks: [
      { platform: 'behance', url: 'https://behance.net/jameswilson' },
      { platform: 'twitter', url: 'https://twitter.com/jwmotiongfx' },
    ],
  },
]

async function seedBuilders() {
  console.log('Starting builders seed...')

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // First, create specialties
  console.log('\n📚 Creating builder specialties...')
  const specialtyMap: Record<string, string> = {}

  for (const specialty of builderSpecialties) {
    // Check if specialty already exists
    const existing = await payload.find({
      collection: 'builder-specialties',
      where: { slug: { equals: specialty.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭️  Specialty "${specialty.title}" already exists`)
      specialtyMap[specialty.slug] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'builder-specialties',
        data: specialty,
      })
      console.log(`  ✅ Created specialty: ${specialty.title}`)
      specialtyMap[specialty.slug] = created.id
    }
  }

  // Get some tools for expertise (if any exist)
  const tools = await payload.find({
    collection: 'tools',
    limit: 10,
  })
  const toolIds = tools.docs.map(t => t.id)

  // Create builders
  console.log('\n👤 Creating builders...')

  for (const builder of builders) {
    // Check if builder already exists
    const existing = await payload.find({
      collection: 'builders',
      where: { slug: { equals: builder.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  ⏭️  Builder "${builder.title}" already exists`)
      continue
    }

    // Map specialty slugs to IDs
    const specialtyIds = builder.specialtySlugs
      .map(slug => specialtyMap[slug])
      .filter(Boolean)

    // Randomly assign 1-3 tools as expertise
    const randomTools = toolIds
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1)

    const { specialtySlugs, ...builderData } = builder

    await payload.create({
      collection: 'builders',
      data: {
        ...builderData,
        specialties: specialtyIds,
        toolsExpertise: randomTools.length > 0 ? randomTools : undefined,
      },
    })

    console.log(`  ✅ Created builder: ${builder.title} (${builder.location})`)
  }

  console.log('\n✨ Builders seed completed!')
  console.log(`   - ${builderSpecialties.length} specialties`)
  console.log(`   - ${builders.length} builders`)

  process.exit(0)
}

seedBuilders().catch((err) => {
  console.error('Error seeding builders:', err)
  process.exit(1)
})
