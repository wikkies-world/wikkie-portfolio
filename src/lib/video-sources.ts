/** Video sources configuration.
*
* By default, videos are served from Cloudinary's CDN (external hosting) so
* the project stays lightweight and deployable. Cloudinary applies:
*   - f_auto: serves WebM to Chrome/Firefox, MP4 to Safari (smaller, faster)
*   - q_auto: adaptive quality optimization (high clarity, minimal size)
*   - Global CDN: fast worldwide delivery
*
* If Cloudinary is not yet configured (CLOUDINARY_CLOUD_NAME missing), the
* app falls back to local files in /public/works/.
*
* --- SETUP (one-time) ---
* 1. Create a free Cloudinary account: https://cloudinary.com
* 2. Copy your cloud name + API key + API secret into .env:
*      CLOUDINARY_CLOUD_NAME=your-cloud-name
*      CLOUDINARY_API_KEY=your-api-key
*      CLOUDINARY_API_SECRET=your-api-secret
* 3. Run:  bun run upload-videos
*    This uploads the configured portfolio videos to Cloudinary and writes
*    public/works/cloudinary-manifest.json.
* 4. (Optional) Delete local videos to slim the deployment:
*    rm -rf public/works  (or delete the .mp4 files within)
*/

export type VideoSource = {
id: string
category: string
categorySlug: string
/** Local path (fallback) */
localSrc: string
localPoster: string
/** Cloudinary public ID (used to build CDN URLs once configured) */
cloudinaryPublicId: string
cloudinaryVersion?: number
duration: number
width: number
height: number
orientation: 'portrait' | 'landscape'
}

export const videoSources: VideoSource[] = [
{ id: 'jiva-ad10', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Jiva_AD10_fayslr.mp4', localPoster: '/works/talking-head/Jiva_AD10_fayslr-poster.jpg', cloudinaryPublicId: 'Jiva_AD10_fayslr', cloudinaryVersion: 1793561351, duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'jiva-ad9-v1', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Jiva_AD9_V1_bzcvx2.mp4', localPoster: '/works/talking-head/Jiva_AD9_V1_bzcvx2-poster.jpg', cloudinaryPublicId: 'Jiva_AD9_V1_bzcvx2', cloudinaryVersion: 1793561354, duration: 0, width: 2160, height: 3840, orientation: 'portrait' },
{ id: 'abc-ad3', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/ABC_AD3_nfxsay.mp4', localPoster: '/works/talking-head/ABC_AD3_nfxsay-poster.jpg', cloudinaryPublicId: 'ABC_AD3_nfxsay', cloudinaryVersion: 1793561355, duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'westbrook-r3', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Westbrook_R3_mdkdcd.mp4', localPoster: '/works/talking-head/Westbrook_R3_mdkdcd-poster.jpg', cloudinaryPublicId: 'Westbrook_R3_mdkdcd', cloudinaryVersion: 1793561354, duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'westbrook-r1', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Westbrook_R1_ll7asr.mp4', localPoster: '/works/talking-head/Westbrook_R1_ll7asr-poster.jpg', cloudinaryPublicId: 'Westbrook_R1_ll7asr', cloudinaryVersion: 1793561361, duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'dr-sindhura-test-edit', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Dr_Sindhura_Test_Edit_gju6mj.mp4', localPoster: '/works/talking-head/Dr_Sindhura_Test_Edit_gju6mj-poster.jpg', cloudinaryPublicId: 'Dr_Sindhura_Test_Edit_gju6mj', cloudinaryVersion: 1793561346, duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'vdc-powerhouse', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/vdc-powerhouse.mp4', localPoster: '/works/motion-graphics/vdc-powerhouse-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/vdc-powerhouse', duration: 110.6, width: 1920, height: 818, orientation: 'landscape' },
{ id: 'narayana-high-school', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/narayana-high-school.mp4', localPoster: '/works/promotional-edit/narayana-high-school-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/narayana-high-school', duration: 95.0, width: 1920, height: 976, orientation: 'landscape' },
{ id: 'nirmal-wonderland', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/nirmal-wonderland.mp4', localPoster: '/works/promotional-edit/nirmal-wonderland-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/nirmal-wonderland', duration: 25.0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'sreekalpa-real-estate', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sreekalpa-real-estate.mp4', localPoster: '/works/real-estate-drone-edits/sreekalpa-real-estate-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sreekalpa-real-estate', duration: 91.8, width: 720, height: 406, orientation: 'landscape' },
{ id: 'sri-brindavan-colony', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sri-brindavan-colony.mp4', localPoster: '/works/real-estate-drone-edits/sri-brindavan-colony-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sri-brindavan-colony', duration: 25.6, width: 1920, height: 1080, orientation: 'landscape' },
{ id: 'sukhadha', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/sukhadha.mp4', localPoster: '/works/talking-head/sukhadha-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/sukhadha', duration: 42.8, width: 608, height: 1080, orientation: 'portrait' },
{ id: 'sreekalpa-logo-reel', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Sreekalpa_Logo_Reel_cgnrmr.mp4', localPoster: '/works/talking-head/Sreekalpa_Logo_Reel_cgnrmr-poster.jpg', cloudinaryPublicId: 'Sreekalpa_Logo_Reel_cgnrmr', duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'sukhadha-reel-4-final', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Sukhadha_Reel_4_Final_rl0l0q.mp4', localPoster: '/works/talking-head/Sukhadha_Reel_4_Final_rl0l0q-poster.jpg', cloudinaryPublicId: 'Sukhadha_Reel_4_Final_rl0l0q', duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
]
