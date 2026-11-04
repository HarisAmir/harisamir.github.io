export interface Publication {
  id: string
  title: string
  venue: string
  year: number
  status: string
  authors: { name: string; highlight?: boolean }[]
  image: { src: string; large: string; width: number; height: number; alt: string; caption: string }
  summary: string
  contributions: string[]
  links: { label: string; href: string; icon: 'paper' | 'arxiv' | 'project' | 'code' | 'dataset' | 'poster' }[]
  bibtex: string
}

// Source: https://mauk95.github.io/ReConText3D/ and its official implementation.
export const publications: Publication[] = [
  {
    id: 'recontext3d',
    title: 'ReConText3D: Replay-based Continual Text-to-3D Generation',
    venue: 'CVPR Findings 2026', year: 2026, status: 'Published',
    authors: [
      { name: 'Muhammad Ahmed Ullah Khan' },
      { name: 'Muhammad Haris Bin Amir', highlight: true },
      { name: 'Didier Stricker' },
      { name: 'Muhammad Zeshan Afzal' },
    ],
    image: {
      src: '/publications/recontext3d-1200.webp', large: '/publications/recontext3d-2400.webp',
      width: 3056, height: 1573,
      alt: 'ReConText3D overview: Toys4K-CL base and novel classes, and a comparison showing replay preserves horse generation while learning dogs, unlike naive fine-tuning.',
      caption: 'Toys4K-CL and continual text-to-3D generation: learning new concepts while retaining earlier ones.',
    },
    summary: 'A replay-based framework that helps text-to-3D models learn new categories without losing the ability to generate previously learned concepts.',
    contributions: [
      'Introduces continual text-to-3D generation and a model-agnostic replay framework.',
      'Selects a compact, diverse replay memory using text-embedding k-Center selection.',
      'Introduces Toys4K-CL, a benchmark with balanced and semantically diverse class-incremental splits.',
      'Reduces catastrophic forgetting across multiple generative backbones without changing their architecture.',
    ],
    links: [
      { label: 'Paper', href: 'https://arxiv.org/pdf/2604.13730', icon: 'paper' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2604.13730', icon: 'arxiv' },
      { label: 'Project', href: 'https://mauk95.github.io/ReConText3D/', icon: 'project' },
      { label: 'Code', href: 'https://github.com/mauk95/ReConText3D', icon: 'code' },
      { label: 'Dataset', href: 'https://github.com/mauk95/ReConText3D#toys4k-cl-benchmark-dataset', icon: 'dataset' },
      { label: 'Poster', href: 'https://mauk95.github.io/ReConText3D/assets/poster.png', icon: 'poster' },
    ],
    bibtex: `@InProceedings{Khan_2026_CVPR,
  author = {Khan, Muhammad Ahmed Ullah and Bin Amir, Muhammad Haris and Stricker, Didier and Afzal, Muhammad Zeshan},
  title = {ReConText3D: Replay-based Continual Text-to-3D Generation},
  booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) Findings},
  month = {June},
  year = {2026},
  pages = {7893-7902}
}`,
  },
]
