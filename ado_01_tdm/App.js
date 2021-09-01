import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, Image,Modal } from 'react-native';
import Constants from 'expo-constants';




const ShowDetalhes = ({display,toogleModal,msgEmail, msgPhone, msgSite}) => (   
    <Modal
          animationType="slide"
          transparent={true}
          visible={display}
          onRequestClose={toogleModal}
    >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                <Pressable onPress={toogleModal}>
                  <Text>{msgEmail}</Text>
                  <Text>{msgPhone}</Text> 
                  <Text>{msgSite}</Text>                  
                </Pressable>
          </View>
        </View>
    
    </Modal>
        
 )

const Pessoa = ({nome,email,link,phone,website  }) => {

    //state para controle do Modal
    const [modal,setModal] = React.useState(false)

    function mudaModal(){
      setModal(!modal)
    }

    return(
    <View>
      <ShowDetalhes display={modal} toogleModal={mudaModal} msgEmail={"Email: " + email} msgPhone={"Telefone: " + phone} msgSite={"Mais Informações: "+website}/>
      
      <Pressable onPress={mudaModal}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: link,
          }}
        />

        <Text style={styles.paragraph}>{nome}</Text>
      </Pressable>
    </View>
    )
}


const DATA = [
        {
            "id": 1,
            "email": "Kanye.West@singer.in",
            "first_name": "Keyne",
            "last_name": "West",
            "avatar": "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/1/1/e/f11e6607e8a0a56b21f139cab85917cd.jpg",
            "phone": "(41) 9214-8432",
            "website": "West.net",
        },
        {
            "id": 2,
            "email": "Lil.naas@x.in",
            "first_name": "Lil",
            "last_name": "Nas X",
            "avatar": "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/b/6/f/7/b6f73a5ff4e4981d2f3892ab7162f6f4.jpg",
            "phone": "(91) 9320-8963",
            "website": "Lil.org"
        },
        {
            "id": 3,
            "email": "Rihana.singer@pop.in",
            "first_name": "Rihana",
            "last_name": "Fenty",
            "avatar": "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/8/e/3/c/8e3ccc0f459fb2c052d60166dbadbd3f.jpg",
            "phone": "(69) 92469-2187",
            "website": "Rihana.info"
        },
        {
            "id": 4,
            "email": "Fergie.Stacy@singer.in",
            "first_name": "Fergie",
            "last_name": "Ferguson",
            "avatar": "https://studiosol-a.akamaihd.net/uploadfile/letras/fotos/f/4/2/c/f42c83f5b1a057a6f964fd24b4b7955b.jpg",
            "phone": "(24) 96938-7485",
            "website": "Fergie.biz"
        }
    ];



//item com uma arrow function
/*const meuItemObj = ({item}) => (
  <View>
      <Text style={styles.paragraph}>{item.title}</Text>
    </View>
)*/



export default function App() {

  //função que renderiza cada item do FlatList
  function meuItem({item}){
    let nomeCompleto = item.first_name + " " + item.last_name
    
    return(
      <Pessoa nome={nomeCompleto} 
              link={item.avatar}
              email={item.email}
              phone={item.phone}
              website={item.website}
      />
    )
  }
  

  return (

    <View style={styles.container}>

      <FlatList
        data={DATA}
        renderItem={meuItem}
        keyExtractor={item => item.id}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#DCDCDC',
    padding: 8,
  },
  paragraph: {
    margin: 15,
    borderRadius: 20,
    padding: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#4169E1'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
