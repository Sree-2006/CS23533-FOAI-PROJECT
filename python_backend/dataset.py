import pandas as pd
import os

def create_dataset():
    """Create a balanced dataset of fake and real news samples"""
    
    fake_news = [
        "Scientists reveal shocking truth about water that doctors don't want you to know! This miracle cure will change your life forever.",
        "BREAKING: Government confirms aliens have been living among us for decades. Click here to see proof!",
        "You won't believe what this celebrity did next! Doctors hate this one simple trick.",
        "Shocking discovery: Eating this common food will make you live to 200 years old!",
        "URGENT: New study shows that everything you know about health is completely wrong!",
        "Miracle weight loss pill approved by doctors lets you lose 50 pounds in one week without exercise!",
        "Breaking news: Scientists discover that the Earth is actually flat and NASA has been lying all along!",
        "Unbelievable: This grandmother's secret remedy cures all diseases instantly!",
        "Shocking revelation: Popular soda brand contains dangerous chemicals that turn you into a zombie!",
        "You won't believe what happened when this person tried this weird trick! Experts are baffled!",
        "EXCLUSIVE: Leaked documents prove that the moon landing was completely fake!",
        "Amazing breakthrough: This common household item can cure cancer overnight!",
        "Doctors furious as new discovery makes all medicine obsolete!",
        "BREAKING: Celebrities reveal the one secret that makes them look 20 years younger!",
        "Shocking: This everyday activity is secretly killing millions of people worldwide!",
        "New study proves that vaccines cause more harm than good - what they're hiding from you!",
        "Incredible discovery: Ancient civilization had technology far superior to ours!",
        "URGENT WARNING: Stop eating this food immediately or face deadly consequences!",
        "Miracle discovery: Scientists find fountain of youth hidden in common vegetable!",
        "EXPOSED: The truth about climate change that scientists don't want you to know!",
        "Shocking footage: Bigfoot caught on camera in suburban neighborhood!",
        "Breaking: New world order plan revealed in leaked government documents!",
        "Incredible: This simple morning ritual can make you a millionaire in 30 days!",
        "Doctors baffled by this weird trick that eliminates all pain instantly!",
        "URGENT: Popular brand recalled after customers report turning invisible!",
        "Amazing: Local woman predicts future with 100% accuracy using this method!",
        "Shocking discovery: Pyramids were actually built by time travelers!",
        "BREAKING: Secret society controls all world governments, insider reveals all!",
        "Miracle cure: Rubbing this on your skin erases wrinkles in minutes!",
        "Unbelievable: Man survives 50 years without food or water using this trick!"
    ]
    
    real_news = [
        "The Federal Reserve announced a quarter-point interest rate increase today, citing ongoing inflation concerns and strong labor market data.",
        "NASA's James Webb Space Telescope has captured detailed images of distant galaxies, providing new insights into the early universe.",
        "The Senate passed a bipartisan infrastructure bill with a vote of 69-30, allocating funds for roads, bridges, and broadband expansion.",
        "Researchers at MIT have developed a new battery technology that could extend electric vehicle range by up to 30 percent.",
        "The World Health Organization reported a decline in malaria cases globally, crediting improved prevention and treatment programs.",
        "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone and services revenue.",
        "Climate scientists warn that global temperatures are on track to rise 1.5 degrees Celsius above pre-industrial levels by 2030.",
        "The Supreme Court heard arguments today in a case that could affect voting rights legislation across multiple states.",
        "A new study published in Nature shows that regular exercise reduces the risk of cardiovascular disease by approximately 25 percent.",
        "The European Central Bank maintained its current interest rates, stating that inflation remains within target ranges.",
        "Archaeologists in Egypt uncovered a 3,000-year-old tomb containing well-preserved artifacts and hieroglyphic inscriptions.",
        "The Labor Department reported that unemployment fell to 3.7 percent last month, with 250,000 new jobs added.",
        "SpaceX successfully launched its Starlink satellite mission, bringing the total number of satellites in orbit to over 3,000.",
        "A clinical trial showed promising results for a new Alzheimer's treatment, though researchers caution that further studies are needed.",
        "The United Nations Security Council convened an emergency meeting to discuss the ongoing humanitarian crisis in several regions.",
        "Major tech companies announced new privacy measures in response to updated data protection regulations.",
        "A peer-reviewed study found that renewable energy sources now account for 30 percent of global electricity generation.",
        "The International Monetary Fund revised its global growth forecast upward, citing stronger-than-expected recovery in major economies.",
        "Education officials reported that high school graduation rates have reached a record high of 88 percent nationwide.",
        "A new volcanic eruption in Iceland has prompted evacuations and disrupted air traffic across Northern Europe.",
        "The Federal Trade Commission approved a merger between two telecommunications companies, subject to certain conditions.",
        "Scientists identified a new species of deep-sea fish during a research expedition in the Pacific Ocean.",
        "The Census Bureau released new population data showing demographic shifts in urban and rural areas.",
        "A breakthrough in quantum computing research could lead to more powerful processors within the next decade.",
        "The Department of Transportation announced new safety regulations for autonomous vehicles operating on public roads.",
        "Agricultural researchers developed drought-resistant crop varieties that could help address food security challenges.",
        "The National Institutes of Health allocated additional funding for cancer research and clinical trials.",
        "Energy companies reported progress in carbon capture technology that could reduce industrial emissions.",
        "The State Department announced a new diplomatic initiative aimed at strengthening trade relationships with allied nations.",
        "Marine biologists documented coral reef recovery in protected areas, suggesting conservation efforts are having positive effects."
    ]
    
    # Create DataFrame
    data = {
        'text': fake_news + real_news,
        'label': ['FAKE'] * len(fake_news) + ['REAL'] * len(real_news)
    }
    
    df = pd.DataFrame(data)
    
    # Shuffle the dataset
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    
    # Save to CSV
    os.makedirs('python_backend/data', exist_ok=True)
    df.to_csv('python_backend/data/news_dataset.csv', index=False)
    
    print(f"Dataset created successfully!")
    print(f"Total samples: {len(df)}")
    print(f"Fake news samples: {len(fake_news)}")
    print(f"Real news samples: {len(real_news)}")
    
    return df

if __name__ == "__main__":
    create_dataset()
