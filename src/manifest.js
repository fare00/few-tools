const manifest = {
    name: "Few Tools",
    description: "Few tools in one.",
    version: "0.1",
    manifest_version: 3,
    background: {
        service_worker: "background.js"
    },
    action: {
        default_popup: '/popup/index.html',
        default_icon: {
            "32": "images/icon_32.png",
            "48": "images/icon_48.png",
            "128": "images/icon_128.png"
        }
    },
    icons: {
        "32": "images/icon_32.png",
        "48": "images/icon_48.png",
        "128": "images/icon_128.png"
    },
    content_scripts: [
        {
            matches: ['https://*/*'],
            all_frames: true,
            run_at: 'document_idle',
            js: ['contentscript.js']
        }
    ],
    permissions: ['tabs', 'storage'],
    web_accessible_resources: [
        {
            resources: [ "*.mp3" ],
            matches: ["https://*/*"]
        }
    ]
}

export default manifest