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
duration: number
width: number
height: number
orientation: 'portrait' | 'landscape'
}

export const videoSources: VideoSource[] = [
{ id: 'vdc-powerhouse', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/vdc-powerhouse.mp4', localPoster: '/works/motion-graphics/vdc-powerhouse-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/vdc-powerhouse', duration: 110.6, width: 1920, height: 818, orientation: 'landscape' },
{ id: 'narayana-high-school', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/narayana-high-school.mp4', localPoster: '/works/promotional-edit/narayana-high-school-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/narayana-high-school', duration: 95.0, width: 1920, height: 976, orientation: 'landscape' },
{ id: 'nirmal-wonderland', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/nirmal-wonderland.mp4', localPoster: '/works/promotional-edit/nirmal-wonderland-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/nirmal-wonderland', duration: 25.0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'sreekalpa-real-estate', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sreekalpa-real-estate.mp4', localPoster: '/works/real-estate-drone-edits/sreekalpa-real-estate-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sreekalpa-real-estate', duration: 91.8, width: 720, height: 406, orientation: 'landscape' },
{ id: 'sri-brindavan-colony', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sri-brindavan-colony.mp4', localPoster: '/works/real-estate-drone-edits/sri-brindavan-colony-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sri-brindavan-colony', duration: 25.6, width: 1920, height: 1080, orientation: 'landscape' },
{ id: 'devender-reddy-hospital', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/devender-reddy-hospital.mp4', localPoster: '/works/talking-head/devender-reddy-hospital-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/devender-reddy-hospital', duration: 77.7, width: 608, height: 1080, orientation: 'portrait' },
{ id: 'sukhadha', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/sukhadha.mp4', localPoster: '/works/talking-head/sukhadha-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/sukhadha', duration: 42.8, width: 608, height: 1080, orientation: 'portrait' },
{ id: 'unjob-assessment-edit', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Unjob_Assessment_Edit_bvurom.mp4', localPoster: '/works/talking-head/Unjob_Assessment_Edit_bvurom-poster.jpg', cloudinaryPublicId: 'Unjob_Assessment_Edit_bvurom', duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'sreekalpa-logo-reel', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Sreekalpa_Logo_Reel_cgnrmr.mp4', localPoster: '/works/talking-head/Sreekalpa_Logo_Reel_cgnrmr-poster.jpg', cloudinaryPublicId: 'Sreekalpa_Logo_Reel_cgnrmr', duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
{ id: 'sukhadha-reel-4-final', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/Sukhadha_Reel_4_Final_rl0l0q.mp4', localPoster: '/works/talking-head/Sukhadha_Reel_4_Final_rl0l0q-poster.jpg', cloudinaryPublicId: 'Sukhadha_Reel_4_Final_rl0l0q', duration: 0, width: 1080, height: 1920, orientation: 'portrait' },
]
