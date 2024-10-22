
export default function main() {
    const content = [
        { id: 'testIMG', src: '/images/PTWF_3.png' }
    ]

    return (
        <div className='w-[1080px] p-20'>
            <img src={content[0].src} loading="lazy" />
        </div>
    )
}