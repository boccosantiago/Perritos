import React from "react";
// import datos from "../datos";

function Filter (props){

    function handleChange(event) {

        const { name, value} = event.target
        props.setFilterData(prevFilterData => {
    
          return {
            ...prevFilterData,
            [name]: value
    
          }
        })
    
      }

    return(
        <div>
            <div>
                <p>Nombre</p>
                <input type="text" placeholder="Kimba" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
            <p>Edad</p>
            <input id="listAge" type="text" name="edad" list="dataListAge" placeholder="Adulto"  onChange={(e) => {handleChange(e)}} />
            <datalist id="dataListAge">
                <option value="Cachorro" />  
                <option value="Joven" />
                <option value="Adulto" />
            </datalist>
            </div>
            <div>
            <p>Sexo</p>
            <input type="text" name="sexo" list="dataListSex" placeholder="Macho" onChange={(e) => {handleChange(e)}}/>
            <datalist id="dataListSex">
                <option value="Macho" />  
                <option value="Hembra" />
            </datalist>
            </div>
            <div>
            <p>Raza</p>
            <input type="text" name="raza" list="dataListBreed" placeholder="Pitbull" onChange={(e) => {handleChange(e)}}/>
            <datalist id="dataListBreed">
                <option value="Bodeguero" />  
                <option value="Border Collie" />
                <option value="Boston Terrier" />
                <option value="Bulldog Francés" />
                <option value="Bulldog Inglés" />
                <option value="Coker Spaniel" />
                <option value="Corgi Galés" />
                <option value="Chihuahua" />
                <option value="Galgo" />
                <option value="Golden Retriever" />
                <option value="Jack Russell" />
                <option value="Labrador Retriever" />
                <option value="Pastor Alemán" />
                <option value="Pitbull" />
                <option value="Podenco" />
                <option value="Yorkshire Terrier" />
            </datalist>
            </div>
            <div>
            <p>Color</p>
            <input type="text" name="color" list="dataListColor" placeholder="Negro" onChange={(e) => {handleChange(e)}} />
            <datalist id="dataListColor">
                <option value="Negro" />  
                <option value="Blanco" />
                <option value="Marrón" />
            </datalist>
            </div>
            <div>
            <p>Tamaño</p>
            <input type="text" name="tamaño" list="dataListSize" placeholder="Grande" onChange={(e) => {handleChange(e)}}/>
            <datalist id="dataListSize">
                <option value="Pequeño" />  
                <option value="Mediano" />
                <option value="Grande" />
            </datalist>
            </div>
            <div>
            <p>Pelaje</p>
            <input type="text" name="pelaje" list="dataListCoat" placeholder="Corto" onChange={(e) => {handleChange(e)}}/>
            <datalist id="dataListCoat">
                <option value="Corto" />  
                <option value="Mediano" />
                <option value="Largo" />
            </datalist>
            </div>
        </div>
    )
}

export default Filter