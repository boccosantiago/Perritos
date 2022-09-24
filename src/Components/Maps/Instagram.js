import { InstagramEmbed } from "react-social-media-embed";

export default function Instagram() {
  return (
    <div style={{display: "flex", flexWrap: "wrap", flexDirection: 'row', justifyContent: "center" }}>
      <InstagramEmbed
        url="https://www.instagram.com/p/Cio3PXMNANv/"
        width={328}
        style={{margin: '0 10px'}}
      />
       <InstagramEmbed
        url="https://www.instagram.com/p/Cimh4eaMAAX/"
        width={328}
        style={{margin: '0 10px'}}
      
      />
      <InstagramEmbed
        url="https://www.instagram.com/p/CiuXJG0hGMK/"
        width={328}
        style={{margin: '0 10px'}}
      />
      <InstagramEmbed
        url="https://www.instagram.com/p/Ciw4r5uM9f4/"
        width={328}
        style={{margin: '0 10px'}}
      />
    </div>
  );
}

