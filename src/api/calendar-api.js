/**
 * @fileoverview
 * Functions to interact with the Google Calendar API.
 * Supports both public read (API Key) and private write (OAuth).
 */

const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID;
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

// Scopes for reading and writing to the calendar
const SCOPES = "https://www.googleapis.com/auth/calendar";
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

let tokenClient;
let gapiInited = false;
let gisInited = false;

// --- Public API Key Functions ---

/**
 * Fetches upcoming events from the public baker's calendar using an API key.
 * @returns {Promise<Array|null>} A list of event objects or null on error.
 */
export async function getUpcomingEvents() {
  const timeMin = new Date().toISOString();
  const timeMax = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000
  ).toISOString();

  // This ensures the calendar ID is properly formatted for the URL
  const encodedCalendarId = encodeURIComponent(CALENDAR_ID);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodedCalendarId}/events?key=${API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&showDeleted=false&singleEvents=true&maxResults=100&orderBy=startTime`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google API Response Error:", errorBody);
      throw new Error(`Google API error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return null;
  }
}

// --- OAuth 2.0 Functions (for writing events) ---

window.gapiLoaded = () => gapi.load("client", initializeGapiClient);
window.gisLoaded = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: () => {}, // Callback is handled by the promise in authenticate()
  });
  gisInited = true;
};

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
}

/**
 * Authenticates the user with Google for calendar write access.
 * Returns a promise that resolves when authentication is complete.
 * @returns {Promise<void>}
 */
export function authenticate() {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      return reject(new Error("Google Identity Services not initialized."));
    }

    tokenClient.callback = (resp) => {
      if (resp.error) {
        return reject(resp);
      }
      resolve();
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.requestAccessToken({ prompt: "" });
    }
  });
}

/**
 * Creates a new event on the baker's primary calendar.
 * @param {object} eventDetails - The details of the event to create.
 * @returns {Promise<object>} The created event object.
 */
export async function createCalendarEvent(eventDetails) {
  if (!gapi.client.getToken()) {
    throw new Error("User is not authenticated.");
  }

  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    start: {
      dateTime: eventDetails.startTime,
      timeZone: "America/Chicago",
    },
    end: {
      dateTime: eventDetails.endTime,
      timeZone: "America/Chicago",
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  const response = await request;
  return response.result;
}