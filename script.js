let targetAngle = 0;
let referenceAngle = null;
let currentAngle = 0;

document.getElementById('startBtn').addEventListener('click', () => {
  targetAngle = parseFloat(document.getElementById('targetAngle').value);
  referenceAngle = null;
  document.getElementById('status').textContent = "Tracking started...";
});

window.addEventListener('deviceorientation', (event) => {
  if (!targetAngle) return;

  const alpha = event.alpha;
  if (referenceAngle === null) referenceAngle = alpha;

  let delta = alpha - referenceAngle;
  if (delta < 0) delta += 360;

  currentAngle = delta;

  if (currentAngle >= targetAngle) {
    document.getElementById('status').textContent = `✅ Target reached: ${currentAngle.toFixed(1)}°`;
  } else {
    document.getElementById('status').textContent = `🔄 Current angle: ${currentAngle.toFixed(1)}°`;
  }

  if (delta < -targetAngle) {
    referenceAngle = alpha;
    document.getElementById('status').textContent = `🔁 Reindexed at ${alpha.toFixed(1)}°`;
  }
});
