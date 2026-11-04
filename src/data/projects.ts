export interface ProjectFigure { src: string; alt: string; caption: string }
export interface Project {
  slug: string; title: string; summary: string;
  tags: string[]; highlights: string[]; figures: ProjectFigure[];
  links: { label: string; href: string; icon: 'paper' | 'code' }[];
  forthcoming?: string[];
  comparison?: { baseline: string; ours: string; baselinePoster: string; oursPoster: string };
}

// Figures and public reports are prepared by scripts/build-media.mjs.
// The DLS3D manuscript is intentionally not a downloadable asset.
export const projects: Project[] = [
  {
    slug: 'dls3d',
    title: 'DLS3D: Faster Multi-View 3D Perception',
    tags: ['Computer Vision', 'Transformers', 'Optimization', '3D Perception'],
    summary: 'Selects task-relevant transformer layers to speed up 3D perception while preserving prediction quality.',
    highlights: [
      '3D detection: 19–22% lower latency and 34–42% fewer active parameters on NVIDIA GV100.',
      'BEV segmentation: 24% lower latency and 27% fewer active parameters, with comparable mIoU.',
    ],
    figures: [], links: [], forthcoming: ['Paper', 'Code'],
    comparison: {
      baseline: '/projects/dls3d-baseline.mp4', ours: '/projects/dls3d-ours.mp4',
      baselinePoster: '/projects/dls3d-baseline.webp', oursPoster: '/projects/dls3d-ours.webp',
    },
  },
  {
    slug: 'continual-event-detection',
    title: 'Continual Object Detection',
    tags: ['Continual learning', 'Event cameras'],
    summary: 'An event-camera detector that learns new road-object classes without forgetting earlier ones.',
    highlights: [
      'Static-teacher distillation retains old classes while adding trucks and buses on the 1 Mpx dataset.',
      '27.3% overall mAP@50 versus 14.1% with naive fine-tuning.',
    ],
    figures: [
      { src: '/projects/events-architecture.webp', alt: 'Static teacher and student architecture with pseudo-label generation, supervised loss, and distillation loss.', caption: 'Architecture. Static-teacher guidance for the student detector during incremental learning.' },
      { src: '/projects/events-per-class.webp', alt: 'Per-class mAP@50 comparison for pedestrian, two-wheeler, car, truck, and bus across four incremental learning methods.', caption: 'Table 1. Class-wise detection results, comparing fine-tuning, Freeze and Add, supervised learning, and distillation.' },
      { src: '/projects/events-overall.webp', alt: 'Base, novel, and overall mAP@50: supervised plus distillation scores 27.3 across all three groups.', caption: 'Table 2. Base, novel, and overall mAP@50. Distillation balances retention of old classes with learning new ones.' },
    ],
    links: [
      { label: 'Report (PDF)', href: '/projects/continual-event-detection.pdf', icon: 'paper' },
      { label: 'Code', href: 'https://github.com/HarisAmir/Continual-Event-Object-Detection/tree/dev', icon: 'code' },
    ],
  },
  {
    slug: 'german-french-translation',
    title: 'German-to-French LLM Translation',
    tags: ['Generative AI', 'Language translation'],
    summary: 'Adapts Llama 3.2 3B with 4-bit LoRA on a single T4 GPU, comparing real and synthetic training data.',
    highlights: [
      'Compares 800 real, 1,600 synthetic, and 2,400 combined training pairs.',
      'Real-data tuning scores 10.53 BLEU (base: 10.49); synthetic and mixed data score 10.23 and 9.11.',
    ],
    figures: [
      { src: '/projects/translation-interface.webp', alt: 'Gradio German-to-French translation interface with German input, optional French reference, translated output, and BLEU score.', caption: 'Demo interface. Translate German text and optionally compare against a French reference.' },
      { src: '/projects/translation-results.webp', alt: 'BLEU results: pretrained 10.49, OPUS-100 fine-tuned 10.53, synthetic fine-tuned 10.23, and combined fine-tuned 9.11.', caption: 'Evaluation. Comparing the base model with three training-data configurations.' },
    ],
    links: [{ label: 'Report (PDF)', href: '/projects/german-french-translation.pdf', icon: 'paper' }],
  },
  {
    slug: 'rgbd-reconstruction',
    title: 'RGB-D Scene Reconstruction',
    tags: ['3D reconstruction', 'Robotics', 'Point Clouds'],
    summary: 'A ROS 2 pipeline that turns ZED camera recordings into colorized 3D maps of indoor spaces.',
    highlights: [
      'Synchronizes RGB, depth, and odometry to place camera observations in a shared world frame.',
      'Filters and accumulates up to 5,000 points per frame, exporting PLY maps.',
    ],
    figures: [
      { src: '/projects/point-cloud-office.webp', alt: 'Colorized 3D point-cloud reconstruction of an office from ZED RGB-D camera recordings.', caption: 'Office reconstruction. Colorized points accumulated from multiple RGB-D frames.' },
      { src: '/projects/point-cloud-bathroom.webp', alt: 'Colorized 3D point-cloud reconstruction of a bathroom from the project repository.', caption: 'Bathroom reconstruction. A second indoor scene processed with the same pipeline.' },
    ],
    links: [{ label: 'Code', href: 'https://github.com/HarisAmir/AICI-Point-Cloud-Generation', icon: 'code' }],
  },
]
