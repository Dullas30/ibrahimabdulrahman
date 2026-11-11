export const SOCIALS = {
  email: "ibrahimabdulrahman242@gmail.com",
  whatsapp: "https://wa.me/2348093695126",
  linkedin: "https://www.linkedin.com/in/abdulrahman-ibrahim-5256493a3",
  twitter: "https://x.com/_dullas_",
} as const;

/** PDF served from /public — used for "Download CV". Replace public/resume.pdf to update it. */
export const RESUME_URL = "/resume.pdf";

/**
 * Live FlowCV share link — used for "View CV" so it always shows the latest
 * version from FlowCV. Leave empty to fall back to the PDF above.
 */
export const RESUME_LIVE_URL = "https://flowcv.com/resume/fq1eblpm8p27";

/** Server route that always downloads the latest CV from FlowCV (see src/server.ts). */
export const RESUME_DOWNLOAD_URL = "/cv.pdf";
