//your code here
 const container = document.getElementById("image-container");
      const resetBtn = document.getElementById("reset");
      const verifyBtn = document.getElementById("verify");
      const h3 = document.getElementById("h");
      const para = document.getElementById("para");

      let selected = [];

      function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

      function loadImages() {
        container.innerHTML = "";
        selected = [];
        resetBtn.style.display = "none";
        verifyBtn.style.display = "none";
        para.textContent = "";
        h3.textContent =
          "Please click on the identical tiles to verify that you are not a robot.";

        const images = ["img1", "img2", "img3", "img4", "img5"];
        const duplicate = images[Math.floor(Math.random() * images.length)];
        const finalImages = shuffle([...images, duplicate]);

        finalImages.forEach((cls) => {
          const img = document.createElement("img");
          img.classList.add(cls);
          img.dataset.type = cls;
          img.addEventListener("click", () => handleClick(img));
          container.appendChild(img);
        });
      }

      function handleClick(img) {
        if (selected.length === 2) return;
        if (selected.includes(img)) return;

        img.classList.add("selected");
        selected.push(img);

        resetBtn.style.display = "inline-block";

        if (selected.length === 2) {
          verifyBtn.style.display = "inline-block";
        }
      }

      resetBtn.addEventListener("click", loadImages);

      verifyBtn.addEventListener("click", () => {
        verifyBtn.style.display = "none";
        if (selected[0].dataset.type === selected[1].dataset.type) {
          para.textContent = "You are a human. Congratulations!";
        } else {
          para.textContent =
            "We can't verify you as a human. You selected the non-identical tiles.";
        }
      });

      loadImages();