const density = "43210?!abc;:+=-,._    ";

function setup() {
  noCanvas();
  capture = createCapture(VIDEO);
  capture.size(208*1.1, 117*1.1);
  //capture.size(windowWidth,windowHeight);
  capture.hide();
  asciiDiv = createDiv();
}

function draw() {
  capture.loadPixels();

  let asciiFrame = "";

  for (let j = 0; j < capture.height; j++) {
    for (let i = 0; i < capture.width; i++) {
      const pixelIndex = (i + j * capture.width) * 4;

      const r = capture.pixels[pixelIndex + 0];
      const g = capture.pixels[pixelIndex + 1];
      const b = capture.pixels[pixelIndex + 2];

      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);

      if (c == " ") asciiFrame += "&nbsp;";
      else asciiFrame += c;
    }

    asciiFrame += "<br/>";
  }

  asciiDiv.html(asciiFrame);
  asciiDiv.addClass('camera');
}
