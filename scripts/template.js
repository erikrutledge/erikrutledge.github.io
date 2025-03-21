async function loadProject() {
  const response = await fetch('../scripts/projects.json');
  const data = await response.json();
  const projects = data.projects;

  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project');
  const project = projects.find(p => p.id === projectId);

  if (project) {
    document.getElementById('page-title').innerText = project.title;
    document.getElementById('project-content').innerHTML = project.content;
    
    if (!project.prev) document.getElementById('prev-project').style.display = 'none'; 
    else document.getElementById('prev-project').href = project.prev;
    
    if (!project.next) document.getElementById('next-project').style.display = 'none';
    else document.getElementById('next-project').href = project.next;

  } else {
    document.getElementById('project-content').innerHTML = '<p>Project not found.</p>';
  }
}

window.onload = loadProject;