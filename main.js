document.querySelector(".control-buttons span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name?");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".name span").innerHTML = yourName;
  }
  //   document.querySelector(".control-buttons").style.display = "none";
  document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

//Add Order Css Properity To Game Blocks

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// flip block function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClick();
    checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
  //no-clicking
  function stopClick() {
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
    }, duration);
  }
}

//check matched block
function checkMatchedBlock(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}

// shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
    return array;
  }
}
