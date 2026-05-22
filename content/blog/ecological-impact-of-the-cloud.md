---
title: "The ecological impact of the cloud"
date: "2023-10-17"
excerpt: "What is the ecological impact of cloud computing? What can actually be done to reduce our cloud carbon footprint and move towards sustainability?"
tags: ["écologie", "tech", "devops"]
key_takeaways:
 - "Taking basic measures can significantly reduce CO2-eq emissions from technical infrastructure, such as optimizing resources, scheduling machine shutdowns and startups, and choosing server locations with lower emissions."

conclusion: |
  The aim is not to undermine the significance of our daily actions (in which I have a strong belief), but to simply raise awareness of the impact we can make by examining the technical infrastructure that leads to yearly whole country emissions.
  
  Indeed, taking basic measures can significantly reduce CO2-eq emissions from technical infrastructure, such as optimizing resources, scheduling machine shutdowns and startups, and choosing server locations with lower emissions.
  
  PS: By the way, I think we're good: we can stop tote bag production

# Images : dépose les fichiers dans public/images/blog/ecological-impact-of-the-cloud/ puis active la ligne.
# - cover (16:9)     : grand visuel en en-tête d'article
# - thumbnail (1:1)  : vignette carrée dans la liste du blog
# cover: "/images/blog/ecological-impact-of-the-cloud/cover.png"
thumbnail: "/images/blog/ecological-impact-of-the-cloud/thumbnail.png"
# Pour ajouter une image, suis le format ci-dessous :
#![Schéma du workflow Make pour l'onboarding des salariés](/images/blog/choix-stack-tech/choix-stack-tech-test.png) 
---
I remember my mother shouting at me, "Greg, turn off the bathroom light!". Or me lecturing my girlfriend, "Stop using plastic bags, they're polluting. Get a tote bag instead". But the reality is that a tote bag must be reused [149 times](https://www2.mst.dk/Udgiv/publications/2018/02/978-87-93614-73-4.pdf) to have the same environmental impact as a plastic bag. Below this figure, they pollute even more than plastic bags.


It has been a long time since I started paying close attention to my ecological impact, and for the past year, as a Founder Associate of Tailwarden, I have been highly involved in the cloud space. In addition to assisting companies in reducing their cloud costs and improving their infrastructure security, this raises a question for me: what is the ecological impact that myself and the cloud infrastructures have in the world?

‍

# Let's consider the units of measurement
In order to accurately assess the ecological impact of our actions, we must use a common unit of measurement. At first glance: knowing the minimum wages of Sri Lanka (10,000 LKR), Togo (52,500 FCFA) and Japan (30,400 JPY) in the local currency does not provide a meaningful comparison. We’ll need to convert all of those numbers into the same currency. Throughout this article, our currency is CO2, and we measure the ecological impact in CO2 equivalents (CO2-eq). This allows us to compare emissions from different greenhouse gases on the basis of their global-warming potential (GWP) and communicate in the same language about taxation and health.

Let’s think of the household bathroom light: 10W LED bathroom light, when left on for 16 hours a day, contributes to 4kg CO2-eq annually. In comparison, driving 10km by car contributes to 2kg CO2-eq. So, 20km of car travel equals one year of bathroom lighting.
On average, a conventional diet contributes to 2.43t CO2-eq per year, whereas a vegetarian diet contributes to 0,94t CO2-eq per year. A round trip from Paris to Los Angeles by plane emits 4.2 tons of CO2-eq per person, equivalent to 3 years of following a vegetarian diet.
Obviously, CO2 emissions must be considered not only during usage but also during the production and disposal of products. Let me show you:

The usage of a television for 2 hours a day every day contributes to 8kg CO2-eq annually. However, the production, transport, and destruction of a single television lead to a total of 343kg CO2-eq, which is equivalent to 43 years of usage.
Find below a table of different CO2-eq emissions.
![Schéma comparatif des émissions de CO2](/images/blog/ecological-impact-of-the-cloud/1-ecological-cloud-table.png) 

‍

# What is the ecological impact of cloud computing?
Considering these magnitudes, what is the status of our technical infrastructures?
Cloud computing offers a number of benefits, including flexibility, scalability, cost efficiency, and the ability to access computing resources and applications from anywhere with an internet connection. Many organizations are now building their applications on cloud platforms like Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), rather than deploying and managing their own on-premise infrastructure. In recent years, the usage of cloud providers has become more and more prevalent among organizations of all sizes and across various industries. According to latest reports, the compound annual growth rate (CAGR) is projected to be 19.9%, leading to the global cloud computing market reaching $1710 billion in 2029.
![Schéma comparatif des émissions de CO2](/images/blog/ecological-impact-of-the-cloud/2-ecological-cloud-market.png) 

The widespread adoption of cloud providers is not without its ecological challenges: cloud computing is now emitting more than commercial flights.

There are three main causes of emissions from cloud providers:

Electricity consumption for running servers: This is the primary cause of emissions, as energy is used to power and cool the servers and other equipment in cloud data centers, releasing greenhouse gases into the atmosphere. The total consumption of cloud infrastructures is 200 TWh per year, which represents 1% of the total world energy consumption. For example, in Europe, each kWh of electricity generates approximately 0.45 kg of CO2 equivalents. It's worth noting that this is just an average and the actual emissions will vary based on the methods of production and the energy sources used.
Let’s assess the CO2 equivalents emissions:

1kwh = 0,45kg co2e200twh=210^11kwh ⇒ 910^10 kg co2e

In total, the consumption results in 90 billion kilograms of CO2-eq. Let's delve into that figure. It equates to the CO2 emissions from 22.5 billion bathroom lights being turned on.

Hardware manufacturing: The manufacturing and disposal of servers and networking equipment can also contribute to emissions. A typical server generates 2.6 tons of CO2 equivalent emissions during production, and there are currently around 100 million servers in operation globally with a typical lifespan of four years, resulting in 65 billion kilograms of CO2-eq emissions per year.
Water consumption: Water is commonly used for cooling servers in data centers, and this can have environmental impacts. While water consumption accounts for a relatively small share of the total carbon footprint of data centers and cloud computing, it can contribute to water stress and scarcity, particularly in areas where water resources are limited. Furthermore, the use of water for cooling can lead to the discharge of warm water into rivers, lakes, and other bodies of water, which can harm aquatic ecosystems.
# So how are the cloud providers facing those challenges?
Many of the major cloud providers have announced various sustainability initiatives and targets to reduce their greenhouse gas emissions. Here are some examples:

Amazon Web Services (AWS): The company has set a goal to power its global infrastructure with 100% renewable energy by 2025, five years ahead of its original target.
Microsoft Azure: Microsoft has committed to becoming carbon negative by 2030, and to remove all of the carbon it has ever emitted from the atmosphere by 2050. The company has also set a goal to be running on 100% renewable energy by 2025.
Google Cloud Platform (GCP): Google has been carbon neutral since 2007, and the company has set a goal to operate on 100% carbon-free energy by 2030. GCP has also launched a Carbon-Intelligent Computing platform, which automatically schedules computing workloads to run at times when the grid is the cleanest.
![Schéma comparatif des émissions de CO2](/images/blog/ecological-impact-of-the-cloud/3-cloud-providers.png) 
First, it is important to understand that carbon neutrality means that a company generates as many emissions as it absorbs, and it goes without saying that carbon neutrality should be measured on a global scale, not at the company level. Anyway, to reach the neutrality objectives at a company level, three paths are possible:

Reduce the emission induced by your activity. The reduction strategy of cloud providers primarily relies on electricity consumption and the use of renewable electricity, as evident from the information presented.
Help others to reduce their own emissions
Increase the carbon sinks. For example Google and Microsoft purchase carbon credits, while Amazon finances non-labeled projects.
But it would be too simple if it was only about Cloud Providers accountability. As a cloud practitioner, you can be involved and reduce the infrastructure carbon print too.

According to a Gartner report, more than 70% of resources are wasted in the cloud. With an achievable optimization of half of those wasted resources, or 35% (70 TWh) of our cloud provider services usage, we can decrease the annual emissions by 31.5 billion kilograms of CO2-eq. A second wait here?

To put this into perspective, this amount is equivalent to the total annual emissions of countries like the Ivory Coast and Bosnia-Herzegovina. It is also 3 times greater than the emissions of Northern Macedonia, 2 times that of Slovenia, and 3/4 of Denmark. And this is only about electricity consumption if we take into account the hardware manufacturing and the water consumption, you can double those figures. This is a significant reduction, which is a far cry from just turning off a bathroom light bulb.

# How to reduce your infrastructure’s carbon footprint?
That being said, how can we act on it?

Selecting a server location based on the carbon emissions of the local electricity.
For instance, 1 kWh of electricity in Sweden emits 14g CO2-eq while 1 kWh in Poland emits 739g CO2-eq, which is 53 times higher. You can use this map to make informed decisions.
![Schéma comparatif des émissions de CO2](/images/blog/ecological-impact-of-the-cloud/4-electricity-map.png) 

Scheduling the shutdown and startup of servers
Another easy way to reduce CO2-eq emissions and your cloud costs is to schedule the shutdown and startup of machines such as on-demand instances or virtual machines that are left running even when not in use.

Optimizing resources
Optimize resources by implementing an observability system that detects under-utilized resources. For example, a great open-source tool like komiser helps in uncovering idle resources. This also applies to load balancers that cannot be shut down. Setting up alerts can help in this regard. How many times have we forgotten to delete a sandbox instance after creating it?

Ultimately, reducing CO2-eq emissions from infrastructure is closely tied to optimizing costs on cloud providers. Thus, take care of both environments and your finance using monitoring tools such as

AWS’ Customer Carbon Footprint Tool, allows customers to see the estimated carbon impacts of their AWS workloads down to the service level for its EC2 compute service and S3 storage service.
Google Cloud’s Carbon Footprint, allows customers to measure, report and reduce their carbon emissions by providing the gross carbon emissions associated with the electricity from their Google Cloud Platform usage.
Active Assist Google cloud application allows checking for under-used resources
AWS Cost explorer to access your data at a resource granularity
Tailwarden provides a crystal clear view of your resources and associated costs, as well as the ability to set up alerts.
