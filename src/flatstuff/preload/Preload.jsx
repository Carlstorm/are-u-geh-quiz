export default function Preload({setIsLoaded}) {
    return (
        <div>
            <button onClick={() => setIsLoaded(true)}>
                begin
            </button>
        </div>
    )
}