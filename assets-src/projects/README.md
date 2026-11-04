# Project media sources

These prepared assets are committed so production builds need only Node and Sharp, not PDF or video conversion tools.

- `events-architecture.png`: Figure 1, page 4 of the supplied event-detection report.
- `events-per-class.png`: Table 1, page 6 of that report.
- `events-overall.png`: Table 2, page 6 of that report.
- `translation-interface.png`: Gradio interface, page 4 of `GenAI_Doc.pdf`.
- `translation-results.png`: BLEU comparison, page 5 of that report.
- `point-cloud-bathroom.png`: `results/bathroom.png` from https://github.com/HarisAmir/AICI-Point-Cloud-Generation (main branch). The office figure is `../point-cloud.png` from the same project.
- `dls3d-baseline.mp4`: `eva_02_B.mov`, SOTA EVA-02 B baseline.
- `dls3d-ours.mp4`: `stream_petr_eva02_clip_vit_b_sgla_ft_s8_w5_ff_softmax_2026_05_11_14_14_Ab_iter_42192.mov`, DLS3D.
- `dls3d-*.png`: first-frame posters extracted from the corresponding videos.

PDF crops were rendered at 3× with PyMuPDF. Page coordinates (points, zero-based page index):

| Figure | Page index | Crop (left, top, right, bottom) |
| --- | --- | --- |
| Event architecture | 3 | 68, 550, 544, 660 |
| Event per-class | 5 | 66, 457, 546, 552 |
| Event aggregate | 5 | 66, 605, 546, 701 |
| Translation interface | 3 | 70, 342, 525, 560 |
| Translation results | 4 | 82, 207, 513, 310 |

Videos use the original H.264 packets, with no re-encoding or playback-rate changes. MP4 containers enable browser playback and put metadata first (`+faststart`). Baseline duration is approximately 11.07 s; DLS3D is 8.74 s. The baseline's QuickTime container has an extended final sample; plain remuxing shortened its final hold by about 0.15 s. The duration bitstream filter below preserves that hold while explicitly preserving PTS/DTS. All 50 baseline packet timestamps and payload checksums were verified identical to the source.

```sh
ffmpeg -i eva_02_B.mov -map 0:v:0 -c:v copy \
  -bsf:v 'setts=pts=PTS:dts=DTS:duration=20262' \
  -an -map_metadata -1 -movflags +faststart assets-src/projects/dls3d-baseline.mp4
ffmpeg -i stream_petr_eva02_clip_vit_b_sgla_ft_s8_w5_ff_softmax_2026_05_11_14_14_Ab_iter_42192.mov \
  -map 0:v:0 -c:v copy -an -map_metadata -1 -movflags +faststart assets-src/projects/dls3d-ours.mp4
```

The unreleased DLS3D PDF and original MOV files are archived separately; they are not required to build the website. Do not copy it to `public`, `dist`, or this asset directory. Only the event and translation reports are published, alongside the résumé, via the explicit allowlist in `scripts/build-media.mjs`.
