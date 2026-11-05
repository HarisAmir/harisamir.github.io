export interface ProjectFigure { src: string; alt: string; caption: string }
export interface Project {
  slug: string; title: string; summary: string;
  tags: string[]; highlights: string[]; figures: ProjectFigure[];
  links: { label: string; href: string; icon: 'paper' | 'github' }[];
  forthcoming?: string[];
  comparison?: { baseline: string; ours: string; baselinePoster: string; oursPoster: string };
}

// Figures and public reports are prepared by scripts/build-media.mjs.
// The DLS3D manuscript is intentionally not a downloadable asset.
export const projects: Project[] = [
  {
    slug: 'dls3d',
    title: 'Efficient Vision Transformer-based Multi-View 3D Perception',
    tags: ['Computer Vision', 'Transformers', 'Optimization', '3D Perception'],
    summary: 'Selects **task-relevant transformer layers** to speed up 3D perception while **preserving prediction quality**.',
    highlights: [
      '**3D detection:** **19–22% lower latency** and **34–42% fewer active parameters** on NVIDIA GV100, with **comparable mAP scores**.',
      '**BEV segmentation:** **24% lower latency** and **27% fewer active parameters**, with **comparable mIoU**.',
    ],
    figures: [], links: [], forthcoming: ['Paper', 'GitHub'],
    comparison: {
      baseline: '/projects/dls3d-baseline.mp4', ours: '/projects/dls3d-ours.mp4',
      baselinePoster: '/projects/dls3d-baseline.webp', oursPoster: '/projects/dls3d-ours.webp',
    },
  },
  {
    slug: 'continual-event-detection',
    title: 'Continual Event-based Object Detection',
    tags: ['Continual learning', 'Training Methodology', 'Event cameras', 'Object detection'],
    summary: 'An event-camera detector that learns new road-object classes without forgetting earlier ones.',
    highlights: [
      'Static-teacher distillation retains old classes while adding trucks and buses on the 1 Mpx dataset.',
      '27.3% overall mAP@50 versus 14.1% with naive fine-tuning.',
    ],
    figures: [
      { src: '/projects/events-architecture.webp', alt: 'Static teacher and student architecture with pseudo-label generation, supervised loss, and distillation loss.', caption: 'Architecture. Static-teacher guidance for the student detector during incremental learning.' },
      { src: '/projects/events-qualitative-baselines.webp', alt: 'Event-camera predictions above ground truth: Freeze and Add retains base classes, while fine-tuning detects novel classes but forgets base classes.', caption: 'Qualitative comparison. Freeze & Add versus fine-tuning, with predictions above ground truth.' },
      { src: '/projects/events-qualitative-continual.webp', alt: 'Event-camera predictions and ground truth for continual learning with supervised loss alone and with supervised plus distillation losses, detecting cars, pedestrians, and trucks.', caption: 'Continual learning. Predictions above ground truth, comparing supervision alone with supervision plus distillation.' },
    ],
    links: [
      { label: 'Report (PDF)', href: '/documents/continual-event-detection.pdf', icon: 'paper' },
      { label: 'GitHub', href: 'https://github.com/HarisAmir/Continual-Event-Object-Detection/tree/dev', icon: 'github' },
    ],
  },
  {
    slug: 'german-french-translation',
    title: 'German-to-French LLM Translation',
    tags: ['Gen AI', 'Fine-tuning', 'LLM', 'Language translation'],
    summary: 'Adapts Llama 3.2 3B with 4-bit LoRA on a single T4 GPU, comparing real and synthetic training data.',
    highlights: [
      'Compares 800 real, 1,600 synthetic, and 2,400 combined training pairs.',
      'Real-data tuning scores 10.53 BLEU (base: 10.49); synthetic and mixed data score 10.23 and 9.11.',
    ],
    figures: [
      { src: '/projects/translation-interface.webp', alt: 'Gradio German-to-French translation interface with German input, optional French reference, translated output, and BLEU score.', caption: 'Demo interface. Translate German text and optionally compare against a French reference.' },
    ],
    links: [{ label: 'Report (PDF)', href: '/documents/german-french-translation.pdf', icon: 'paper' }],
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
    links: [{ label: 'GitHub', href: 'https://github.com/HarisAmir/AICI-Point-Cloud-Generation', icon: 'github' }],
  },
]
