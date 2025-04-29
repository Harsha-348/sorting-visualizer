"use strict";

// Sidebar click logic
const sortItems = document.querySelectorAll(".sort-list li");
let currentAlgorithm = null;

// Initial render on page load
window.onload = () => {
  console.log("Page loaded");
  RenderScreen();
  // Set default algorithm if none selected
  if (!currentAlgorithm) {
    console.log("Setting default algorithm");
    const defaultAlgo = document.querySelector('.sort-list li[data-sort="bubble"]');
    if (defaultAlgo) {
      defaultAlgo.click();
    }
  }
};

sortItems.forEach(item => {
  item.addEventListener("click", () => {
    console.log("Algorithm selected:", item.getAttribute("data-sort"));
    // Remove active class from all items
    sortItems.forEach(i => i.classList.remove("active"));
    // Add active class to clicked item
    item.classList.add("active");

    // Get selected algorithm
    currentAlgorithm = item.getAttribute("data-sort");
    
    // Update description and complexity
    updateDescription(currentAlgorithm);
    
    // Render new array
    RenderScreen();
  });
});

// Generate new array button
document.getElementById("random").addEventListener("click", () => {
  console.log("Generating new array");
  RenderScreen();
});

// Start sorting
const start = async () => {
  console.log("Starting sort with algorithm:", currentAlgorithm);
  if (!currentAlgorithm) {
    alert("Please select a sorting algorithm first!");
    return;
  }

  let speedValue = Number(document.querySelector("#speed").value);
  if (speedValue === 0) speedValue = 1;
  console.log("Speed value:", speedValue);

  let algorithm = new sortAlgorithms(speedValue);
  
  // Disable inputs during sorting
  disableInputs(true);
  
  try {
    switch (currentAlgorithm) {
      case "bubble":
        await algorithm.BubbleSort();
        break;
      case "selection":
        await algorithm.SelectionSort();
        break;
      case "insertion":
        await algorithm.InsertionSort();
        break;
      case "merge":
        await algorithm.MergeSort();
        break;
      case "quick":
        await algorithm.QuickSort();
        break;
      case "heap":
        await algorithm.HeapSort();
        break;
      case "shell":
        await algorithm.ShellSort();
        break;
      case "counting":
        await algorithm.CountingSort();
        break;
      case "radix":
        await algorithm.RadixSort();
        break;
      case "bucket":
        await algorithm.BucketSort();
        break;
      default:
        console.log("Algorithm not implemented yet:", currentAlgorithm);
        break;
    }
  } catch (error) {
    console.error("Sorting error:", error);
  } finally {
    // Re-enable inputs after sorting
    disableInputs(false);
  }
};

// Render the visualization
const RenderScreen = async () => {
  console.log("Rendering screen");
  await RenderList();
};

// Generate and display the array
const RenderList = async () => {
  console.log("Generating new list");
  let sizeValue = Number(document.querySelector("#array-size").value);
  console.log("Array size:", sizeValue);
  await clearScreen();

  let list = await randomList(sizeValue);
  console.log("Generated list:", list);
  
  const arrayNode = document.querySelector(".array");
  console.log("Array container:", arrayNode);
  
  if (!arrayNode) {
    console.error("Array container not found!");
    return;
  }

  // Clear any existing content
  arrayNode.innerHTML = "";
  
  // Find the maximum value to scale heights properly
  const maxValue = Math.max(...list);
  const containerHeight = arrayNode.clientHeight - 50; // Account for padding
  const heightScale = (containerHeight * 0.85) / maxValue; // Use 85% of available height
  
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    // Scale height based on container size
    node.style.height = `${element * heightScale}px`;
    arrayNode.appendChild(node);
  }
  console.log("Finished rendering array");
};

// Generate random array
const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

// Clear the visualization area
const clearScreen = async () => {
  console.log("Clearing screen");
  const arrayNode = document.querySelector(".array");
  if (arrayNode) {
    arrayNode.innerHTML = "";
  }
};

// Enable/disable inputs during sorting
const disableInputs = (disabled) => {
  document.querySelector("#array-size").disabled = disabled;
  document.querySelector("#speed").disabled = disabled;
  document.querySelector("#random").disabled = disabled;
  document.querySelector("#start").disabled = disabled;
  sortItems.forEach(item => item.style.pointerEvents = disabled ? "none" : "auto");
};

// Event listeners
document.querySelector("#start").addEventListener("click", start);
document.querySelector("#array-size").addEventListener("change", RenderScreen);
document.querySelector("#speed").addEventListener("change", () => {
  // Speed can be changed during sorting
});
