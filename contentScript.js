function createOverlay(emailData) {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'email-scraper-overlay';

  // Create header
  const header = document.createElement('div');
  header.className = 'email-scraper-header';

  const title = document.createElement('h3');
  title.textContent = 'Scraped Email Data';
  title.style.margin = '0';

  const closeButton = document.createElement('button');
  closeButton.className = 'email-scraper-close';
  closeButton.textContent = '×';
  closeButton.onclick = () => overlay.remove();

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create content container
  const content = document.createElement('div');
  content.className = 'email-scraper-content';

  // Helper function to create field elements
  const createField = (label, value) => {
    const field = document.createElement('div');
    field.className = 'email-scraper-field';

    const labelElement = document.createElement('span');
    labelElement.className = 'email-scraper-label';
    labelElement.textContent = label;

    const valueElement = document.createElement('div');
    valueElement.className = 'email-scraper-value';
    valueElement.textContent = value || 'Not found';

    field.appendChild(labelElement);
    field.appendChild(valueElement);
    return field;
  };

  // Add fields to content
  content.appendChild(createField('Subject', emailData.subject));
  content.appendChild(createField('From', emailData.sender));
  content.appendChild(createField('Date', emailData.date));
  content.appendChild(createField('Content Preview', emailData.mainContent.substring(0, 200) + '...'));

  // Assemble overlay
  overlay.appendChild(header);
  overlay.appendChild(content);

  // Add to page
  document.body.appendChild(overlay);
}

function scrapeEmailContent() {
  // Initialize object to store scraped data
  let emailData = {
    subject: '',
    sender: '',
    date: '',
    mainContent: ''
  };

  // Gmail-specific selectors
  if (window.location.hostname.includes('mail.google.com')) {
    // Get email subject
    const subjectElement = document.querySelector('h2[data-thread-perm-id]');
    if (subjectElement) {
      emailData.subject = subjectElement.textContent.trim();
    }

    // Get sender information
    const senderElement = document.querySelector('[email]');
    if (senderElement) {
      emailData.sender = senderElement.getAttribute('email');
    }

    // Get date
    const dateElement = document.querySelector('[title*="20"]');
    if (dateElement) {
      emailData.date = dateElement.getAttribute('title');
    }

    // Get main content
    const contentElement = document.querySelector('.a3s.aiL');
    if (contentElement) {
      emailData.mainContent = contentElement.textContent.trim();
    }

    // Remove any existing overlay
    const existingOverlay = document.querySelector('.email-scraper-overlay');
    if (existingOverlay) {
      existingOverlay.remove();
    }

    // Create and show the overlay
    createOverlay(emailData);
  } else {
    alert('Please open a Gmail message first!');
  }
}

// Execute the function when the script is injected
scrapeEmailContent();