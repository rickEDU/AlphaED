export default function EventCustom(urlP, data){
    const event = new CustomEvent("onstatechange", {
        detail:{url : urlP, data: data}
    })
    return event;
}