document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    async function (tabs) {
      const currentTab = tabs[0];
      const url = currentTab.url;

      if (url.includes("privacy") || url.includes("cookie")) {
        const apiUrl =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
        const API_KEY = "AIzaSyCBPS7MwLkDQoFgZR0YwR4jxtcISmQxA8I";

        const fetchData = async () => {
          const url =
            "https://text-extract7.p.rapidapi.com/?url=https%3A%2F%2Fvarlcservices.com%2Fprivacy";
          const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "481bc2cecfmsh6bcf92c5577adb9p1c0ed1jsnac284e3b033e",
              "X-RapidAPI-Host": "text-extract7.p.rapidapi.com",
            },
          };

          try {
            const response = await fetch(url, options);
            const data = await response.json();

            // Check if the response contains a 'raw_text' field
            if ("raw_text" in data) {
              const extractedText = data.raw_text;
              if (extractedText.trim() !== "") {
                generateContent(extractedText);
              }
            } else {
              console.error(
                "The API response does not contain a raw_text field."
              );
            }
          } catch (error) {
            console.error(error);
          }
        };

        const generateContent = async (text) => {
          const requestData = {
            contents: [
              {
                parts: [
                  {
                    text: `summarize this text having subheading in no more than 250 word '${text}'. Also do not add any opening statement like 'certainly..., surely..., etc'. Then use <b></b> to enclose the each keypoint topic and use the <p></p> tag to enclose the items under each keypoint topic`,
                  },
                ],
              },
            ],
          };

          try {
            const response = await fetch(`${apiUrl}?key=${API_KEY}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            });
            const data = await response.json();
            document.getElementById("result-container").innerHTML =
              data.candidates[0].content.parts[0].text;
          } catch (error) {
            console.error("Error:", error);
          }
        };

        fetchData();
      } else {
        document.getElementById("result-container").innerHTML =
          "This is not a privacy or cookie page. Please navigate to the privacy or cookie page.";
      }
    }
  );
});
