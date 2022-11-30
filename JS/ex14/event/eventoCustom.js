export default function EventCustom(urlP){
    const event = new CustomEvent("onstatechange", {detail:{url : urlP}})
    return event;
}