const urlParameters = new URLSearchParams(window.location.search);

const fileID = urlParameters.get('id');
const movieTitle = urlParameters.get('title');
const movieDate = urlParameters.get('date');

if (fileID) {
  document.getElementById('template-title').textContent = movieTitle;
  document.getElementById('tab-title').textContent = `${movieTitle} - CodeDuck`;
  document.getElementById('template-date').textContent = movieDate;

  fetch(`content/${fileID}.md`)
    .then(answer => {
      if (!answer.ok) throw new Error("This .md file was not found in the server");
      return answer.text();
    })
  .then(rawMarkdown => {
      const generatedHTML = marked.parse(rawMarkdown);
      document.getElementById('template-body').innerHTML = generatedHTML;
    })
  .catch(error => {
      document.getElementById('template-body').innerHTML = "<p>Critical Error: Review not found or corrupted.</p>";
    });
} else {
  document.getElementById('template-body').textContent = "Movie not specified on the URL";
}
