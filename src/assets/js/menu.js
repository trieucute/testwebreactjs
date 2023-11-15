export const menushow=()=>{
  const navbarToggler= document.querySelector('.navbar-toggler')
  const navbarCollapse= document.querySelector('.navbar-collapse');
  const background= document.querySelector('.background');
  const iconX= document.querySelector('.icon-x--menu')
  navbarToggler.addEventListener('click', ()=>{
    navbarCollapse.classList.add('show')
    background.classList.add('active')
  })
  
  background.addEventListener('click', () => {
  navbarCollapse.classList.remove('show')
  background.classList.remove('active')
  
  })
  iconX.addEventListener('click',()=>{
  navbarCollapse.classList.remove('show')
  background.classList.remove('active')
  })
}
// menushow()