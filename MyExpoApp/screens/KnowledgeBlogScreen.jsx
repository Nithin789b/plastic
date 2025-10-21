import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KnowledgeBlogScreen = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

const blogCategories = [
    {
      id: 1,
      color: '#4A90E2',
      image: '../assets/images/marine-life.png',
      content: {
        intro: 'The ocean has become the ultimate sink for plastic pollution. An estimated 8 to 12 million metric tons of plastic enter our oceans annually, forming vast garbage patches and permeating every level of the water column.',
        sections: [
          {
            title: 'Effects',
            text: 'Marine animals, from tiny plankton to majestic whales, suffer horrifying fates. Turtles mistake plastic bags for jellyfish, their primary food source, leading to fatal blockages. Seabirds, seals, and dolphins become entangled in abandoned fishing gear and debris, resulting in injury, drowning, or slow starvation.'
          },
          {
            title: 'Causes',
            text: 'This widespread contamination stems from various sources. The primary causes include improper disposal of single-use plastics from coastal communities, illegal dumping from ships, and land-based runoff, where rivers carry plastic waste from inland cities directly into the sea.'
          }
        ]
      }
    },
    {
      id: 2,
      color: '#50C5F5',
      image: '../assets/images/animal.png',
      content: {
        intro: "On a beach suffocating in plastic, innocent lives pay the ultimate price. A sea turtle lies entangled in deadly nets, while a seal and a baby bird are trapped by our throwaway trash. This is the heartbreaking, visual proof of the plastic pollution crisis impacting our oceans.",
        sections: [
          {
            title: 'Effects',
            text: 'Plastic waste is frequently ingested by animals, causing fatal internal blockages and starvation. Entanglement in plastic debris leads to drowning, suffocation, and life-threatening injuries for countless species, while microplastics accumulate in their bodies, poisoning them from the inside out.'
          },
          {
            title: 'Causes',
            text: 'Why does this happen? The main causes are human carelessness and flawed waste systems. Discarded fishing gear (ghost nets), rampant littering in parks and natural areas, and overflowing landfills all lead to plastic waste entering animal habitats, where it becomes a deadly trap.'
          }
        ]
      }
    },
    {
      id: 3,
      color: '#8B7355',
      image: '../assets/images/soil.png',
      content: {
        intro: 'While the ocean often gets the spotlight, plastic pollution in our soil is an equally serious and often overlooked problem. Agricultural films, plastic mulches, discarded consumer products, and microplastics from various sources contaminate the very ground that feeds us.',
        sections: [
          {
            title: 'Effects',
            text: 'Plastic fragments alter soil structure, reducing its ability to hold water and nutrients, and hindering aeration. This directly impacts plant growth and crop yields. Earthworms and other vital soil organisms, crucial for soil health, can ingest microplastics, affecting their health and disrupting the entire soil ecosystem.'
          },
          {
            title: 'Causes',
            text: 'The root causes of soil plastic pollution include the widespread use of plastic products in agriculture, improper disposal of plastic waste, and the breakdown of larger plastic items into microplastics that infiltrate the soil. Lack of effective waste management systems exacerbates this issue, allowing plastics to accumulate in our farmlands and natural areas.'
          }
        ]
      }
    },
    {
      id: 4,
      color: '#E85D75',
      image: '../assets/images/human.png',
      content: {
        intro: 'The sheer scale of plastic production and consumption by humans is astounding. We produce hundreds of millions of tons of plastic every year, much of it single-use, designed to be thrown away after a brief moment of utility.',
        sections: [
          {
            title: 'Effects',
            text: 'The effects on human health are a growing concern. We ingest microplastics through contaminated food, water, and even the air we breathe. These particles have been found in human blood, lungs, and placenta. The long-term health consequences, including potential hormonal disruption and links to chronic diseases, are now under intense scientific investigation.'
          },
          {
            title: 'Causes',
            text: 'Our reliance on plastic packaging, disposable products, and synthetic materials has created a relentless flood of waste. The primary causes are overconsumption of single-use items, inadequate waste management systems, and a "throwaway" culture that fails to account for the environmental cost of plastic.'
          }
        ]
      }
    }
  ];    
  const renderBlogCard = (blog) => (
    <TouchableOpacity 
      key={blog.id}
      style={[styles.blogCard, { borderLeftColor: blog.color }]}
      onPress={() => setSelectedBlog(blog)}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{blog.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.blogTitle}>{blog.title}</Text>
          <Text style={styles.readMore}>Tap to read more</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#8E8E93" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>The Plastic Tide</Text>
        <Text style={styles.heroSubtitle}>
          Learn how plastic pollution affects our planet
        </Text>
      </View>

      {/* Blog Categories */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Explore Topics</Text>
        {blogCategories.map(renderBlogCard)}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Blog Detail Modal */}
      <Modal
        visible={selectedBlog !== null}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedBlog && (
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedBlog(null)}>
                <Ionicons name="close" size={28} color="#1C1C1E" />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>{selectedBlog.title}</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView 
              style={styles.modalScroll}
              showsVerticalScrollIndicator={false}
            >
              {/* Featured Image */}
              <View style={styles.featuredImageContainer}>
                <Image 
                  source={{ uri: selectedBlog.image }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={[styles.overlay, { backgroundColor: selectedBlog.color + '20' }]}>
                  <Text style={styles.overlayIcon}>{selectedBlog.icon}</Text>
                  <Text style={styles.overlayTitle}>{selectedBlog.title}</Text>
                </View>
              </View>

              {/* Content */}
              <View style={styles.contentContainer}>
                <Text style={styles.introText}>{selectedBlog.content.intro}</Text>

                {selectedBlog.content.sections.map((section, index) => (
                  <View key={index} style={styles.section}>
                    <View style={[styles.sectionHeader, { backgroundColor: selectedBlog.color + '15' }]}>
                      <View style={[styles.sectionDot, { backgroundColor: selectedBlog.color }]} />
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                    </View>
                    <Text style={styles.sectionText}>{section.text}</Text>
                  </View>
                ))}

                {/* Call to Action */}
                <View style={[styles.ctaCard, { backgroundColor: selectedBlog.color + '10' }]}>
                  <Ionicons name="leaf" size={32} color={selectedBlog.color} />
                  <Text style={styles.ctaTitle}>Take Action Today</Text>
                  <Text style={styles.ctaText}>
                    Every small action counts. Start making a difference by reducing your plastic consumption.
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#8E8E93',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  blogCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
  },
  textContainer: {
    flex: 1,
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  readMore: {
    fontSize: 14,
    color: '#8E8E93',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  modalScroll: {
    flex: 1,
  },
  featuredImageContainer: {
    width: '100%',
    height: 280,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  overlayTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  contentContainer: {
    padding: 20,
  },
  introText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1C1C1E',
    marginBottom: 32,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#3C3C43',
  },
  ctaCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 12,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 16,
    color: '#3C3C43',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default KnowledgeBlogScreen;