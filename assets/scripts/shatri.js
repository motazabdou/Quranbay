let audio = document.querySelector(".quranPlayer");
let surahsContainer = document.querySelector(".surahs-shatri");
let ayah = document.querySelector(".ayah-shatri");
let next = document.querySelector(".next");
let play = document.querySelector(".play");
let prev = document.querySelector(".prev");

getSurahsShatri();

function getSurahsShatri(){
    fetch("https://api.alquran.cloud/v1/surah")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for (let surah in data.data) {
            surahsContainer.innerHTML += `
            <div>
            <p class="surah-name-arabic">${data.data[surah].name}</p>
            </div>
            `;
        }

        //select all surahs
        let allSurahs = document.querySelectorAll(".surahs-shatri div");

        allSurahs.forEach((surah,index) => {
            surah.addEventListener("click", function(){
                fetch(`https://mp3quran.net/api/_english.php`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(index+1);
                    let verses = data.reciters[203].Server + "/00" + (index+1) + ".mp3";
                    if(index > 8 && index < 98){
                      verses = data.reciters[203].Server + "/0" + (index+1) + ".mp3";
                    }
                    else if(index > 98){
                        verses = data.reciters[203].Server + "/" + (index+1) + ".mp3";
                      }
                    audio.src = verses;
                    ayah.innerHTML = surah.innerText;
                    audio.play();

                    //when surah is finished, autoplay the next one
                    audio.addEventListener("ended", function(){
                        play.innerHTML = `<i class="fas fa-play"></i>`;
                        isPlaying = false;

                        index++;

                        verses = data.reciters[203].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[203].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[203].Server + "/" + (index+1) + ".mp3";
                        }

                        audio.src = verses;
                        ayah.innerHTML = allSurahs[index].innerText;
                        play.innerHTML = `<i class="fas fa-pause"></i>`;
                        isPlaying = true;
                        audio.play();

                        // if(index = 113){
                        //     audio.addEventListener("ended", function(){
                        //         swal("إنتهت السورة", "", "success");
                        //         audio.pause();
                        //         for(let i = 0; i < allSurahs.length; i++){
                        //             allSurahs[i].addEventListener("click", function(){
                        //             console.log(`the index is ${i}`);
                        //             });
                        //             index === i;
                        //         }
                        //     });
                        // }
                    });

                    

                    

                    //handle next buttons
                    next.addEventListener("click", function(){
                        index++;
                        verses = data.reciters[203].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[203].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[203].Server + "/" + (index+1) + ".mp3";
                        }
                        audio.src = verses;
                        ayah.innerHTML = allSurahs[index].innerText;
                        play.innerHTML = `<i class="fas fa-pause"></i>`;
                        isPlaying = true;
                        audio.play();
                    });

                    //Handle previous button
                    prev.addEventListener("click", function(){
                        index--;
                        verses = data.reciters[203].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[203].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[203].Server + "/" + (index+1) + ".mp3";
                        }
                        audio.src = verses;
                        ayah.innerHTML = allSurahs[index].innerText;
                        play.innerHTML = `<i class="fas fa-pause"></i>`;
                        isPlaying = true;
                        audio.play();
                    });

                    //handle play button
                    let isPlaying = false;
                    togglePlay();
                    
                    function togglePlay(){
                        if(isPlaying){
                            audio.pause();
                            play.innerHTML = `<i class="fas fa-play"></i>`;
                            isPlaying = false;
                        }
                        
                        else {
                            audio.play();
                            play.innerHTML = `<i class="fas fa-pause"></i>`;
                            isPlaying = true;
                        }
                    }

                    play.addEventListener("click", togglePlay);

                    document.addEventListener("keypress", function(event){
                        if(event.key === " "){
                            event.preventDefault();
                            togglePlay();
                        }
                    });

                });
            });
        })
    });
}
