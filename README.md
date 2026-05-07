# Surya Prakash S - Portfolio Website

A modern, interactive portfolio website showcasing professional experience, skills, and projects. Features smooth scroll animations, timeline visualization, and responsive design.

## 🚀 Live Demo

Visit: `https://[your-username].github.io/portfolio`

## ✨ Features

- **Scroll-Based Animation**: Interactive canvas animation that responds to scroll
- **Career Timeline**: Visual representation of professional journey at Blue Yonder
- **Project Showcase**: Grid layout highlighting key projects and achievements
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI**: Clean, minimalist design with smooth transitions

## 🛠️ Technologies Used

- Pure HTML5
- CSS3 (Animations, Grid, Flexbox)
- Vanilla JavaScript (Canvas API, Intersection Observer)
- No frameworks or dependencies required

## 📦 Deployment to GitHub Pages

### Method 1: GitHub Web Interface

1. **Create a new repository**
   - Go to GitHub.com and create a new repository
   - Name it `portfolio` (or any name you prefer)
   - Make it public
   - Don't initialize with README (we already have one)

2. **Upload files**
   - Click "uploading an existing file"
   - Drag and drop all files from this folder
   - Or use "choose your files" to select them
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Select "/ (root)" folder
   - Click Save
   - Your site will be live at `https://[your-username].github.io/portfolio`

### Method 2: Command Line (Git)

```bash
# Navigate to this folder
cd surya-portfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/[your-username]/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Method 3: GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Choose this folder
4. Publish repository to GitHub
5. Enable GitHub Pages in repository settings

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── script.js               # JavaScript functionality
├── README.md               # This file
│
└── images/
    ├── projects/           # Project screenshots
    │   ├── database-management.jpg
    │   ├── technical-support.jpg
    │   ├── automation.jpg
    │   └── microservices.jpg
    │
    └── sequence/           # Scroll animation frames
        ├── 0000.png
        ├── 0001.png
        └── ... (75 frames total)
```

## 🎨 Customization

### Update Personal Information

Edit `index.html`:
- Name and title in overlay sections
- Career timeline entries
- Project descriptions
- Contact information

### Change Colors

Edit `styles.css`:
- Background colors: Search for `#121212`, `#0a0a0a`
- Text colors: Modify color values
- Accent colors: Update hover states and shadows

### Add More Projects

In `index.html`, duplicate a project card and update:
- Image source
- Project title
- Tags
- Description

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🔧 Local Development

Simply open `index.html` in your browser. No build process required!

For a local server (optional):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then visit `http://localhost:8000`

## 📄 License

© 2026 Surya Prakash S. All rights reserved.

## 📞 Contact

- Email: suryaprakash0831@gmail.com
- LinkedIn: [linkedin.com/in/suryaprakashs0831](https://www.linkedin.com/in/suryaprakashs0831)
- Twitter: [@spSuryaprakash8](https://twitter.com/spSuryaprakash8)

## 🙏 Acknowledgments

Design inspiration from modern portfolio trends with custom implementation for optimal performance and accessibility.

---

**Note**: After deploying to GitHub Pages, it may take a few minutes for your site to go live. GitHub will send you an email when it's ready!
