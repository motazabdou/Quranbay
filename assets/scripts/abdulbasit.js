let audio = document.querySelector(".quranPlayer");
let surahsContainer = document.querySelector(".surahs");
let ayah = document.querySelector(".ayah");
let next = document.querySelector(".next");
let play = document.querySelector(".play");
let prev = document.querySelector(".prev");

getSurahsAbdulbasit();

function getSurahsAbdulbasit(){
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
        let allSurahs = document.querySelectorAll(".surahs div");

        allSurahs.forEach((surah,index) => {
            surah.addEventListener("click", function(){
                fetch(`https://mp3quran.net/api/_english.php`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(index+1);
                    let verses = data.reciters[8].Server + "/00" + (index+1) + ".mp3";
                    if(index > 8 && index < 98){
                      verses = data.reciters[8].Server + "/0" + (index+1) + ".mp3";
                    }
                    else if(index > 98){
                        verses = data.reciters[8].Server + "/" + (index+1) + ".mp3";
                      }
                    audio.src = verses;
                    ayah.innerHTML = surah.innerText;
                    audio.play();

                    //when surah is finished, autoplay the next one
                    audio.addEventListener("ended", function(){
                        play.innerHTML = `<i class="fas fa-play"></i>`;
                        isPlaying = false;

                        index++;

                        verses = data.reciters[8].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[8].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[8].Server + "/" + (index+1) + ".mp3";
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
                        verses = data.reciters[8].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[8].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[8].Server + "/" + (index+1) + ".mp3";
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
                        verses = data.reciters[8].Server + "/00" + (index+1) + ".mp3";
                        if(index > 8 && index < 98){
                        verses = data.reciters[8].Server + "/0" + (index+1) + ".mp3";
                        }
                        else if(index > 98){
                            verses = data.reciters[8].Server + "/" + (index+1) + ".mp3";
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

// let audio = document.querySelector(".quranPlayer");
// let surahsContainer = document.querySelector(".surahs");
// let ayah = document.querySelector(".ayah");
// let next = document.querySelector(".next");
// let play = document.querySelector(".play");
// let prev = document.querySelector(".prev");
// getSurahs();

// //yo!

// function getSurahs(){
//     fetch("https://api.quran.sutanlab.id/surah")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         for (let surah in data.data) {
//             surahsContainer.innerHTML += `
//             <div>
//             <p class="surah-name-arabic">${data.data[surah].name.long}</p>
//             </div>
//             `;
//         }

//         //select all surahs
//         let allSurahs = document.querySelectorAll(".surahs div");
//         let ayahsAudios;
//         let ayahsText;

//         allSurahs.forEach((surah,index) => {
//             surah.addEventListener("click", function(){
//                 fetch(`https://api.alquran.cloud/v1/surah/${index + 1}/ar.abdulsamad`)
//                 .then(response => response.json())
//                 .then(data => {
//                     let verses = data.data.ayahs;
//                     console.log(verses);
//                     ayahsAudios = [];
//                     ayahsText = [];
//                     for(let verse of verses){
//                         ayahsAudios.push(verse.audio);
//                         ayahsText.push(verse.text)

//                     }
//                     let ayahIndex = 0;
//                     changeAyah(ayahIndex);
//                     audio.addEventListener("ended", function(){
//                         ayahIndex ++;
//                         if(ayahIndex < ayahsAudios.length){
//                             changeAyah(ayahIndex);
//                         }
//                         else {
//                             ayahIndex = 0;
//                             changeAyah(ayahIndex);
//                             swal("إنتهت السورة", "", "success");
//                             audio.pause();
//                         }
//                     });

//                     //handle previous and next buttons
//                     next.addEventListener("click", function(){
//                         ayahIndex < ayahsAudios.length - 1 ? ayahIndex++ : ayahIndex = 0;
//                         changeAyah(ayahIndex);
//                     });

//                     prev.addEventListener("click", function(){
//                         ayahIndex === 0 ? ayahIndex = ayahsAudios.length - 1 : ayahIndex--;
//                         changeAyah(ayahIndex);
//                     });

//                     //handle play button
//                     let isPlaying = false;
//                     togglePlay();
//                     function togglePlay(){
//                         if(isPlaying){
//                             audio.pause();
//                             play.innerHTML = `<i class="fas fa-play"></i>`;
//                             isPlaying = false;
//                         }
//                         else {
//                             audio.play();
//                             play.innerHTML = `<i class="fas fa-pause"></i>`;
//                             isPlaying = true;
//                         }
//                     }

//                     play.addEventListener("click", togglePlay);

//                     function changeAyah(index){
//                         audio.src = ayahsAudios[index];
//                         ayah.innerHTML = ayahsText[index];
//                         audio.play();
//                     }

//                 });
//             });
//         })
//     });
// }


// //Abdul basit murattal
// // https://api.alquran.cloud/v1/ayah/262/ar.abdulbasitmurattal ... ayah = ayah number
// // https://api.alquran.cloud/v1/ayah/2:9/ar.abdulsamad .. Abdulbasit mujawwad
// // https://api.alquran.cloud/v1/ayah/2:9/ar.mahermuaiqly  .. 2 is the surah number and 9 is the ayah number
// // https://api.alquran.cloud/v1/ayah/2:9/ar.saoodshuraym
// // https://api.alquran.cloud/v1/ayah/2:9/ar.husary
// // https://api.alquran.cloud/v1/ayah/2:9/ar.husarymujawwad
// // https://api.alquran.cloud/v1/ayah/2:9/ar.minshawimujawwad
// // https://api.alquran.cloud/v1/ayah/2:9/ar.alafasy
