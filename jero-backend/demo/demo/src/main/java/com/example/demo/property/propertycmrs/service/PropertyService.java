package com.example.demo.property.propertycmrs.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.bson.types.ObjectId;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.demo.SecurityConfig.jwt.JwtProvider;
import com.example.demo.booking.DTO.OtherPartyinfo;
import com.example.demo.booking.DTO.PropertyBooking;
import com.example.demo.booking.bookingCMRS.model.BookingModel;
import com.example.demo.booking.bookingCMRS.repo.BookingRepo;
import com.example.demo.locations.locationCMRS.model.LocationModel;
import com.example.demo.locations.locationCMRS.repository.LocationRepository;
import com.example.demo.locations.locationCMRS.service.ILocationService;
import com.example.demo.property.propertycmrs.DTO.CreatePropertyHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBasicHandler;
import com.example.demo.property.propertycmrs.DTO.GetPropertyBookedHandler;
import com.example.demo.property.propertycmrs.DTO.ReviewHandler;
import com.example.demo.property.propertycmrs.model.EProperty;
import com.example.demo.property.propertycmrs.model.PropertyModel;
import com.example.demo.property.propertycmrs.model.ReviewsType;
import com.example.demo.property.propertycmrs.repository.PropertyRepo;
import com.example.demo.review.ReviewModel;
import com.example.demo.review.ReviewRepo;
import com.example.demo.user.userCMRS.model.UserModel;
import com.example.demo.user.userCMRS.repository.UserRepository;

@Service
public class PropertyService implements IPropertyService {

    @Autowired private PropertyRepo propertyRepo;
    @Autowired private ReviewRepo reviewRepo;
    @Autowired private LocationRepository locationRepository;
    @Autowired private ILocationService locationService;
    @Autowired private UserRepository userRepository;
    @Autowired BookingRepo bookingRepo;


    @Override
    public void createProperty(String token, CreatePropertyHandler cph) {
        String userID =  JwtProvider.getIdFromJwtToken(token);
        System.out.println(userID);
		//UserModel user = userRepository.findByEmail(email);
        PropertyModel pm = new PropertyModel();
        pm.setOwnerId(new ObjectId(userID));
        System.out.println("hitwio");
        Map<String,String> hierarchy = cph.getAddressData().getHierarchy();
        System.out.println("hi:" + hierarchy.get("city_district"));
        System.out.println(hierarchy.get("town"));
        pm.setTownId((hierarchy.get("town")));
        pm.setCityDistrictId((hierarchy.get("city_district")));
        pm.setCityId((hierarchy.get("city")));
        pm.setCountyId((hierarchy.get("county")));
        pm.setStateId((hierarchy.get("state")));
        pm.setCountryId((hierarchy.get("country")));
        pm.setAddress(cph.getAddressData().getLocationName());
        pm.setLongitude(cph.getAddressData().getLon());
        pm.setLatitude(cph.getAddressData().getLat());
        // pm.setNumberBedrooms(cph.getNumberBedrooms());
        // pm.setNumberBathrooms(cph.getNumberBathrooms());
        pm.setNumberDoubleBeds(cph.getStep3Data().getDoubleBeds());
        pm.setNumberSingleBeds(cph.getStep3Data().getSingleBeds());
        pm.setNumberHammocks(cph.getStep3Data().getHammocks());
        pm.setNumberSofaBeds(cph.getStep3Data().getSofaBeds());
        pm.setMinGuests(cph.getStep3Data().getMinGuests());
        pm.setNumBedrooms(cph.getStep3Data().getNumBedrooms());
        pm.setNumberBathrooms(cph.getStep3Data().getNumBathrooms());
        pm.setMaxGuests(cph.getStep3Data().getMaxGuests());
        pm.setPricePerNight(cph.getStep3Data().getPricePerNight());
        pm.setPriceIncreasePerPerson(cph.getStep3Data().getPriceIncreasePerPerson());
        pm.setAcceptsChildren(cph.getStep3Data().isAcceptsChildren());
        pm.setAcceptsPets(cph.getStep3Data().isAcceptsPets());
        pm.setDisabilityFriendly(cph.getStep3Data().isDisabilityFriendly());
        pm.setTitle(cph.getOverviewData().getPropertyTitle());
        pm.setDescription(cph.getOverviewData().getPropertyDescription());
        pm.setGuide(cph.getOverviewData().getPropertyGuide());
        pm.setRules(cph.getOverviewData().getPropertyRules());
        pm.setClimateData(cph.getClimateData());
        pm.setBeautyData(cph.getBeautyData());
        pm.setEntertainmentData(cph.getEntertainmentData());
        pm.setHealthAndSafetyData(cph.getHealthAndSafetyData());
        pm.setKitchenData(cph.getKitchenData());
        pm.setLaundryData(cph.getLaundryData());
        pm.setTransportData(cph.getTransportData());
        pm.setWaterData(cph.getWaterData());
        // pm.setPropertyType(EProperty.APARTMENT);
        pm.setImageUrls(cph.getImagesData());
        Set<Instant> today = new HashSet<>();
        today.add(Instant.now());
        pm.setBlockedDates(today);
        // dates
        //List<ReviewsType> reviews = new ArrayList<>();
        Map<String,List<ReviewsType>> reviews =  new HashMap<>();
        pm.setReviews(reviews);
        pm.setPercentile(-1);
        pm.setAvgReviewScore(0);
        //pm.setAvailableDates(cph.getAvailableDates());
        pm.setStatus(false);


        propertyRepo.save(pm);
    }

    @Override
    public List<Map<String,String>> getPropertiesByLocation(String queriedLocation, Instant startDate, Instant endDate, int numAdults, int numChildren, int numPets, Optional<String> sort) {
        LocationModel location  = locationRepository.findLocationById(queriedLocation);
        //System.out.println("location " + location);
        if(location == null){
           
            List<String> fallbacks =(locationRepository.findFallbacks(queriedLocation));
            System.out.println(fallbacks.toString());
            if(fallbacks == null || fallbacks.size() == 0){
                System.out.println("hello");
                List<String> locationWithAccent = locationRepository.ignoreAccents(queriedLocation);
                if(locationWithAccent.size() > 0){
                    location = locationRepository.findLocationById(locationWithAccent.getFirst());
                    System.out.println(location);
                    if(location == null){
                        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
                    }
                    return getPropertiesByLocation(locationWithAccent.getFirst(), startDate, endDate, numAdults, numChildren, numPets, sort);
                }
            } else{
                String longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy = "";
                for(String fallback : fallbacks){
                    if(fallback.length() > longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy.length()){
                        longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy = fallback;
                    }
                }
                if(longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy.equals("")){
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
                }
                System.out.println(longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy);
                return getPropertiesByLocation(longestAndPotentiallyMostLikelyToBeHigherUpInTheHierarchy, startDate, endDate, numAdults, numChildren, numPets, sort);
            }
        }
        // System.out.println("hit");
        // System.out.println(location);
        if(location == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "LOCATION_NOT_FOUND");
        }
        String locationType = location.getLocationType();
        List<PropertyModel> pms = new ArrayList<>();
        pms = extracted2(location, locationType, pms, startDate, endDate, numAdults, numChildren, numPets, sort);

        return getRes(pms,queriedLocation);
    }



    @Override 
    public List<Map<String,String>> getPropertiesBySmart(
        Instant startDate, 
        Instant endDate, 
        int numAdults, 
        int numChildren, 
        int numPets,
        String attractions,
        String holidayType,
        String tourismLevels,
        int minTemp,
        int maxTemp,
        String gettingAround
    )
    {
        List<String> attractionsClean = new ArrayList<>();
        List<String> gettingAroundClean = new ArrayList<>(); 
        getSplit1(attractions, attractionsClean);
        getSplit1(gettingAround, gettingAroundClean);
        //System.out.println("attractions clean " + attractionsClean.toString());
        Set<PropertyModel> properties = propertyRepo.smartFilter(
            startDate, endDate, numAdults, numChildren, 
            numPets, attractionsClean, holidayType, 
            tourismLevels, minTemp, maxTemp, gettingAroundClean
        );
        return getRes(properties,"");
    }

    private void getSplit1(String param, List<String> res) {
        String[] split1 = param.split("&");
        // not ideal
        for(String val : split1){
            String[] split2 = val.split("=");
            if(split2[1].equals("true")){
                res.add(split2[0]);
            }
        }
    }

    @Override
    public Map<String, List<PropertyBooking>> getPropertiesFromBookings(Map<String, List<BookingModel>> bookings, String token) {
        boolean isCustomer = JwtProvider.getRoleFromJwtToken(token).equals("customer");
        Map<String, List<PropertyBooking>>  res = new HashMap<>();
        for(String key : bookings.keySet()){
            List<PropertyBooking> arr = new ArrayList<>();
            for(BookingModel booking : bookings.get(key)){
                PropertyBooking pb = new PropertyBooking();
                if(booking.getPropertyId().toHexString().equals("67f6ae5881ebbd6dc69897e1")){
                    pb.setPropertyId(booking.getPropertyId().toHexString());
                    pb.setBookingId(booking.getId().toHexString());
                    pb.setTitle("DeletedProperty");
                    pb.setImage("/vercel.svg");
                    pb.setStart(booking.getStartDate());
                    pb.setEnd(booking.getEndDate());
                    pb.setNumAdults(booking.getNumAdults());
                    pb.setNumChildren(booking.getNumChildren());
                    pb.setNumPets(booking.getNumPets());
                    pb.setTotalCost(booking.getTotalCost());
                    pb.setAccepted(booking.isAccepted());
                    pb.setCancelled(booking.isCancelled());
                    OtherPartyinfo opi = new OtherPartyinfo();
                    opi.setFirstName("delete");
                    opi.setLastName("deleted");
                    opi.setIntro("deleted");
                    opi.setImgULR("/vercel.svg");
                    pb.setOtherPartyInfo(opi);
                }else{
                PropertyModel pm = this.getPropertyById(booking.getPropertyId());

                pb.setPropertyId(booking.getPropertyId().toHexString());
                pb.setBookingId(booking.getId().toHexString());
                pb.setTitle(pm.getTitle());
                pb.setImage(pm.getImageUrls().getFirst());
                pb.setStart(booking.getStartDate());
                pb.setEnd(booking.getEndDate());
                pb.setNumAdults(booking.getNumAdults());
                pb.setNumChildren(booking.getNumChildren());
                pb.setNumPets(booking.getNumPets());
                pb.setTotalCost(booking.getTotalCost());
                pb.setAccepted(booking.isAccepted());
                pb.setCancelled(booking.isCancelled());
                if(isCustomer){
                    pb.setOtherPartyInfo(getOtherPartyProfile(booking.getOwnerId()));
                } else{
                    pb.setOtherPartyInfo(getOtherPartyProfile(booking.getGuestId()));
                }
            }
                arr.add(pb);
            }
            res.put(key,arr);
            System.out.println("*********************8");
        }
        return res;
    }

    @Override
    public PropertyModel getPropertyById(ObjectId propertyId) {
        PropertyModel property = propertyRepo.findById(propertyId).get();
        if(property == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PROPERTY_NOT_FOUND");
        }
        return property;
    }

    @Override
    public GetPropertyBasicHandler processProperty(PropertyModel property, GetPropertyBasicHandler res){
        double lat = property.getLatitude();
        double lon = property.getLongitude();
        // https://stackoverflow.com/questions/15117403/dto-pattern-best-way-to-copy-properties-between-two-objects
        BeanUtils.copyProperties(property, res);
        System.out.println("bean " + res.toString());
        // property.getReviews();
        List<ReviewsType> reviews = new ArrayList<>();

        Map<String, List<ReviewsType>> propertyReviews = property.getReviews();
        
        for(List<ReviewsType> propertyReview : propertyReviews.values()){
            reviews.addAll(propertyReview);
        }
        res.setReviews(reviews);
        Map<String,String> map = new HashMap<>();
        UserModel user= userRepository.findById(property.getOwnerId()).get();
        if(user.getPrivacy().get("alwaysShowProfile")){
            map.put("fname", user.getFirstName());
            map.put("lname", user.getLastName());
            map.put("intro",  user.getIntroduction());
            map.put("img", user.getProfileImgUrl());
        }else{
            map.put("fname", "Anonymous");
            map.put("lname", "Anonymous");
            map.put("intro",  "Anonymous");
            map.put("img", "");
        }
        res.setProfileCardInfo(map); 
        res.setLatitude(((double)((int)(lat *1000.0)))/1000.0);
        res.setLongitude(((double)((int)(lon*1000.0)))/1000.0);        
        return res;
    }

    @Override
    public GetPropertyBookedHandler processBookedProperty(PropertyModel property, GetPropertyBookedHandler res){
        BeanUtils.copyProperties(property, res);
        List<ReviewsType> reviews = new ArrayList<>();

        Map<String, List<ReviewsType>> propertyReviews = property.getReviews();
        
        for(List<ReviewsType> propertyReview : propertyReviews.values()){
            reviews.addAll(propertyReview);
        }
        res.setReviews(reviews);
        Map<String,String> map = new HashMap<>();
        UserModel user= userRepository.findById(property.getOwnerId()).get();
        if(user.getPrivacy().get("profile")){
            map.put("fname", user.getFirstName());
            map.put("lname", user.getLastName());
            map.put("intro",  user.getIntroduction());
            map.put("img", user.getProfileImgUrl());
        }else{
            map.put("fname", "Anonymous");
            map.put("lname", "Anonymous");
            map.put("intro",  "Anonymous");
            map.put("img", "");
        }
        res.setProfileCardInfo(map); 
        return null;
    }

    @Override
    public void addReview(String jwt, ReviewHandler newReview){
        String userId = JwtProvider.getIdFromJwtToken(jwt);
        UserModel um = userRepository.findById(new ObjectId(userId)).get();
        String name = um.getPrivacy().get("review") ? um.getFirstName() : "anonymous";
        System.out.println(um.getPrivacy().get("review"));
        System.out.println("name: " + name);

        BookingModel booking = bookingRepo.findById(new ObjectId(newReview.getBookingId())).get();
        if(booking == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "BOOKING_NOT_FOUND");

        }
        if(Instant.now().isBefore(booking.getEndDate())){
            throw new ResponseStatusException(HttpStatus.TOO_EARLY, "REVIEW_NOT_ALLOWED_UNTIL_AFTER");
        }

        if(booking.isReviewed()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "ALREADY_REVIEWED");
        }

        if(!booking.isAccepted() || booking.isCancelled()){
            throw new ResponseStatusException(HttpStatus.I_AM_A_TEAPOT, "CANT_REVIEW_BOOKING_DID_NOT_HAPPEN");
        }
        
        PropertyModel pm = propertyRepo.findById(booking.getPropertyId()).get();
        
        List<ReviewsType> reviews = new ArrayList<>();

        Map<String,List<ReviewsType>> propertyReviews = pm.getReviews();
        System.out.println("full reviews: "  +  propertyReviews.toString());
        
        for(List<ReviewsType> propertyReview : propertyReviews.values()){
            reviews.addAll(propertyReview);
        }
        System.out.println("reviews :" + reviews.toString() );
        //List<ReviewsType> reviews = pm.getReviews();
        ///if(reviews == null) reviews = new ArrayList<>();
        double oldAvg = pm.getAvgReviewScore();
        
        double newAvg = getNewAvg(reviews, oldAvg, newReview.getScore());
        pm.setAvgReviewScore(newAvg);
        
        ReviewsType rt = new ReviewsType();
        rt.setReviewDate(Instant.now());
        rt.setUserName(name);
        rt.setScore(newReview.getScore());
        rt.setTitle(newReview.getTitle());
        rt.setBody(newReview.getBody());

        //reviews.add(rt);
        //Map<String, ReviewsType> newReviewMap = new HashMap<>();
        if(propertyReviews.containsKey(userId)){
            List<ReviewsType> oldReviews =  propertyReviews.get(userId);
            oldReviews.add(rt);
            propertyReviews.put(userId, oldReviews);
        }else{
            List<ReviewsType> brandSpankingNew = new ArrayList<>();
            brandSpankingNew.add(rt);
            propertyReviews.put(userId,brandSpankingNew);
        }
        
       // newReviewMap.put(userId, rt);

       // propertyReviews.add(newReviewMap);
        pm.setReviews(propertyReviews);
        //pm.setReviews(reviews);

        propertyRepo.save(pm);

        calcPercentile(newAvg, oldAvg, pm);
        //pm.setPercentile(newPercentil);
        //propertyRepo.save(pm);



        booking.setReviewed(true);
        bookingRepo.save(booking);


        // List<BookingModel> pastBookings = bookings.get("past");
        // for(BookingModel booking : pastBookings){
        //     if(booking.getPropertyId().toHexString().equals(rh.getPropertyId()) && booking.isAccepted() && !booking.isCancelled() && !booking.isReviewed()){
        //         PropertyModel pm = propertyRepo.findById(booking.getPropertyId()).get();
        //         List<ReviewsType> reviews = pm.getReviews();
        //         if(reviews == null) reviews = new ArrayList<>() 

            
        }
    
    @Override
    public void handleReviewDeletion(List<BookingModel> bookings, String id){

        // https://stackoverflow.com/questions/30611870/how-can-i-get-a-list-from-some-class-properties-with-java-8-stream
        Set<ObjectId> propertyIds = bookings.stream()
                  .map(BookingModel::getPropertyId)
                  .collect(Collectors.toSet());
        
        List<PropertyModel> properties = propertyRepo.findAllById(propertyIds);
        if(properties != null && !properties.isEmpty()){
        for(PropertyModel propert : properties){
            Map<String,List<ReviewsType>> allReviews = propert.getReviews();
            List<ReviewsType> relevantReviews = allReviews.get(id);
            if(relevantReviews != null && !relevantReviews.isEmpty()){
                allReviews.remove(id);
                allReviews.put("67f6b00b81ebbd6dc69897e5", relevantReviews);
                propert.setReviews(allReviews);
            }
            
        }
        propertyRepo.saveAll(properties);
    }

    }

    @Override
    public void handlePropertiesUserDeletion(String id){
        List<PropertyModel> properties = propertyRepo.findAllByOwnerId(new ObjectId(id)); 

        deletePropertyHelper(properties);
        //System.out.println("account delete " + properties);
    }

    @Override
    public void handlePropertiesDeletion(PropertyModel property){
        List<PropertyModel> properties = new ArrayList<>();
        properties.add(property);

        deletePropertyHelper(properties);
        //System.out.println("account delete " + properties);
    }

    private void deletePropertyHelper(List<PropertyModel> properties) {
        if(properties != null && !properties.isEmpty()){
            Set<Double> reviewScores = properties.stream()
            .map(PropertyModel::getAvgReviewScore)
            .collect(Collectors.toSet());

            ReviewModel rm = reviewRepo.findById(1).get();
            List<Double> scores = rm.getScores();

            for(Double avg : reviewScores){
                int removeIndex = Collections.binarySearch(scores, avg);
                if(removeIndex >= 0){
                    scores.remove(removeIndex);
                }

            }

            rm.setScores(scores);
            reviewRepo.save(rm);


            propertyRepo.deleteAll(properties);
        }
    }


    @Override
    public List<Map<String,String>> getPropertiesByOwnerId( String token){
        String ownerId = JwtProvider.getIdFromJwtToken(token);
        List<PropertyModel> properties = propertyRepo.findAllByOwnerId(new ObjectId(ownerId));

        return getRes(properties, "");
    }

    private void calcPercentile(double newAvg, double oldAvg, PropertyModel pm) {
        ReviewModel rm = reviewRepo.findById(1).get();
        List<Double> scores = rm.getScores();
        if(scores.size() == 0){
            scores.add(newAvg);
            rm.setScores(scores);
            reviewRepo.save(rm);

            pm.setAvgReviewScore(newAvg);
            pm.setPercentile(100);
            propertyRepo.save(pm);
            return;
            //return 1.0;
        }

        System.out.println(oldAvg);
        int removeIndex = Collections.binarySearch(scores, (double)oldAvg);
        System.out.println(removeIndex);
        
        if(removeIndex >= 0){
            scores.remove(removeIndex);
        }
        
        System.out.println(scores.toString());


        int addIndex = Collections.binarySearch(scores, newAvg);
        //boolean needToIterate = true;
        if(addIndex < 0){
           // needToIterate = false;
            addIndex = addIndex * -1;
            addIndex--;
        }
        
        scores.add(addIndex, newAvg);
        rm.setScores(scores);
        reviewRepo.save(rm); 
        System.out.println("scores: " + scores);
        
        int countLessThan = 0;

        // if(needToIterate){
        //     for(int i = addIndex; i < scores.size(); i++){
        //         if(scores.get(i) != (newAvg)){
        //             countLessThan = i;
        //             break;
        //         }
        //     }
        // }else{
        //     countLessThan = addIndex;
        // }
        

        System.out.println("countless: " + countLessThan);
        double percentile = (countLessThan / (double)scores.size()) * 100;
        System.out.println("percentile: " + percentile);
        if(scores.size() == 1) {
            percentile = 100;
            pm.setPercentile(percentile);
        }
        //pm.setPercentile(percentile);
        pm.setAvgReviewScore(newAvg);
       
        propertyRepo.save(pm);
        System.out.println("score size: " + scores.size());
        //adjust(pm.getId(), newAvg,percentile,(double)scores.size(), sizeIncrease);
        adjust(pm.getId(), scores);

        //return (countLessThan / scores.size() * 1.0) * 100;
        
    }

    private double getNewAvg(List<ReviewsType> reviews, double existingAvg, int newScore) {
        return ((reviews.size() * existingAvg) + newScore) / (reviews.size() + 1);
    }

    private void adjust(ObjectId newestPropertyToBeReview, List<Double> scores){
        System.out.println("hit1");
        List<PropertyModel> properties = propertyRepo.findAll();
        System.out.println("hit");
        // https://stackoverflow.com/questions/35701337/java-8-lambda-get-and-remove-element-from-list
        properties.removeIf(property -> "67f6ae5881ebbd6dc69897e1".equals(property.getId().toHexString()));

        Map<Double,Double> scoreToPercentile = new HashMap<>();
        int l = 0;
        int r = 1;
        while(r < scores.size()){
            if(scores.get(r) != scores.get(l)){
                scoreToPercentile.put(scores.get(l), (r / (double)scores.size()) * 100);
                l = r;
            }

            r++;
        }
        scoreToPercentile.put(scores.getLast(),100.0);

        for(PropertyModel property : properties){
            // if(property.getId().equals(newestPropertyToBeReview)){
            //     continue;
            // }
            if(property.getReviews() == null || property.getReviews().isEmpty()){
                continue;
            }
            double mean = property.getAvgReviewScore();
            System.out.println("mean: " +mean);
            System.out.println("map: " + scoreToPercentile.toString() );
            double newPercentile = scoreToPercentile.get(mean);
            property.setPercentile(newPercentile);
            propertyRepo.save(property);
        }
        }   


    private List<PropertyModel> extracted2(LocationModel location, 
        String locationType, 
        List<PropertyModel> pms, 
        Instant startDate, 
        Instant endDate, 
        int numAdults, 
        int numChildren, 
        int numPets,
        Optional<String> sort
    ) {
       // if(locationType.equals("city")){
            pms = propertyRepo.basicFilter(location.getId(), startDate, endDate, (numAdults + numChildren), numChildren > 0, numPets > 0, sort);
        //}
        return pms;
    }

    private String extracted(PropertyModel pm) {
        String displayLocation = "";
        if(pm.getTownId() != null && !pm.getTownId().equals("")){
            displayLocation = pm.getTownId();
        }else if(pm.getCityDistrictId() != null && !pm.getCityDistrictId().equals("")){
            displayLocation = pm.getCityDistrictId();
        } else if(pm.getCityId() != null && !pm.getCityId().equals("")){
            displayLocation = pm.getCityId();
        }

        String[] words = displayLocation.split(" ");
        // https://stackoverflow.com/questions/2041778/how-to-initialize-hashset-values-by-construction
        Set<String> skipWords =  Stream.of("of", "de","the", "el")
         .collect(Collectors.toCollection(HashSet::new));
        
         StringBuilder sb = new StringBuilder();
        for(int i = 0 ; i < words.length; i++){
            String current = words[i];
            if(skipWords.contains(current) || current.length() <= 1){
                sb.append(current);
                sb.append(" ");
                continue;
            }
            
            sb.append(Character.toUpperCase(current.charAt(0)));
            sb.append(current.substring(1, current.length()));
            sb.append(" ");


        }

        return sb.toString().trim();
    }

    private List<Map<String, String>> getRes(Collection<PropertyModel> pms, String queried) {
        List<Map<String,String>> res = new ArrayList<>();
        for(PropertyModel pm : pms){
            String displayLocation = extracted(pm);
            Map<String,String> propertyAttributes = new HashMap<>();
            propertyAttributes.put("id", pm.getId().toHexString());
            propertyAttributes.put("title", pm.getTitle());
            propertyAttributes.put("displayLocation",displayLocation);
            // propertyAttributes.put("townId", pm.getTownId());
            propertyAttributes.put("searched",queried);
            propertyAttributes.put("pricePerNight", String.valueOf(pm.getPricePerNight()));
            propertyAttributes.put("mainImage",pm.getImageUrls().getFirst());
            propertyAttributes.put("extraGuestPriceIncrease", String.valueOf(pm.getPriceIncreasePerPerson()));
            propertyAttributes.put("percentile",  String.format("%.2f", pm.getPercentile()));
            propertyAttributes.put("lat", String.format("%.2f", pm.getLatitude()));
            propertyAttributes.put("lon", String.format("%.3f", pm.getLongitude()));
            
            res.add(propertyAttributes);
        }
        return res;
    }

    private OtherPartyinfo getOtherPartyProfile(ObjectId userID){
        UserModel user = userRepository.findById(userID).get();
        if(!user.getPrivacy().get("profile")){
            return new OtherPartyinfo();
        }
        OtherPartyinfo opi = new OtherPartyinfo();
        opi.setFirstName(user.getFirstName());
        opi.setLastName(user.getLastName());
        opi.setIntro(user.getIntroduction());
        opi.setImgULR(user.getProfileImgUrl());
        return opi;
    }



}
