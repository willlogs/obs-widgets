const plan = [
  {
    duration: 25,
    name: "Social Saturday",
    color: "orange"
  },
  {
    duration: 5,
    name: "Rest",
    color: "sky"
  },
  {
    duration: 25,
    name: "Code",
    color: "red"
  },
  {
    duration: 5,
    name: "Rest!",
    color: "sky"
  },
  {
    duration: 25,
    name: "Social Saturday",
    color: "orange"
  },
  {
    duration: 5,
    name: "Rest",
    color: "sky"
  },
  {
    duration: 25,
    name: "Code",
    color: "red"
  },
  {
    duration: 5,
    name: "Rest!",
    color: "sky"
  },
  {
    duration: 25,
    name: "Social Saturday",
    color: "orange"
  },
  {
    duration: 5,
    name: "Rest",
    color: "sky"
  },
  {
    duration: 25,
    name: "Code",
    color: "red"
  },
  {
    duration: 5,
    name: "Rest!",
    color: "sky"
  },
];

let active_step = 0;

function createProgressBar() {
  let sum = 0;
  for(let i = 0; i < plan.length; i++){
    sum += plan[i].duration;
    console.log(i);
  }

  const container = document.getElementById('progressBarContainer');

  const progressBar = document.createElement('div');
  progressBar.className = `bg-gray-300 h-1 flex items-center`;

  // Create steps
  for (let i = 0; i < plan.length; i++) {
    const step = document.createElement('div');
    const fill = document.createElement('div');

    step.className = 'h-1 flex items-center';
    step.style.width = `${plan[i].duration/sum * 100}%`
    step.id = `progressStep${i}`;

    if(i == 0){
      step.innerHTML = `
        <h1 id="stepTitle${i}" class="absolute text-xl text-bold text-white top-[-30px]">${plan[i].name}</h1>
      `;
    }
    else{
      step.innerHTML = `
        <h1 id="stepTitle${i}" class="absolute text-xs text-white top-[-30px]">${plan[i].name}</h1>
      `;
    }

    fill.className = `bg-${plan[i].color}-700 h-full`;
    fill.id = `progressFill${i}`;

    step.appendChild(fill);
    progressBar.appendChild(step);
  }

  container.appendChild(progressBar);
}

function updateProgress(step, progress) {
  const stepElement = document.getElementById(`progressFill${step}`);
  if (stepElement) {
    stepElement.style.width = `${progress}%`;
  }
}

function startProgressUpdate() {
  let progress = 0;
  const interval = setInterval(() => {
    if (active_step < plan.length) {
      progress++;
      updateProgress(
        active_step,
        (progress / 60 / plan[active_step].duration) * 100
      );

      if (progress >= plan[active_step].duration * 60) {
        progress = 0;

        if (active_step > plan.length) {
          // over!
          clearInterval(interval);
        } else{
          document.getElementById(`stepTitle${active_step}`).classList.remove("font-bold", "text-xl");
          document.getElementById(`stepTitle${active_step}`).classList.add("text-xs");

          active_step++;

          try{
            document.getElementById(`stepTitle${active_step}`).classList.add("font-bold", "text-xl");
          }
          catch{}
        }
      }
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  createProgressBar();
  startProgressUpdate();
});